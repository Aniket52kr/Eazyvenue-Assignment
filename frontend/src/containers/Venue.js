import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
import Layout from '../components/Layout/index.layout';
import { ImgsCard } from '../components/UI/ImgsCard';
import { useDispatch, useSelector } from 'react-redux';
import { getOneVenue } from '../actions/venue.actions';
import { getPublicURL } from '../urlConfig';
import BookingModel from '../components/UI/BookingModel';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const VenuePage = () => {
    document.title = "Venue Booking App | Venue Details";
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const oneVenueInfo = useSelector(state => state.oneVenueInfo);
    const [bookingModalShow, setBookingModalShow] = useState(false);
    const [latLng, setLatLng] = useState(null);
    const mapRef = useRef(null); // 🧠 to track the map instance
    const { venueId } = useParams();

    useEffect(() => {
        if (venueId) dispatch(getOneVenue(venueId));
    }, [venueId]);

    const venue = oneVenueInfo.venue || {};
    const {
        _id,
        venueName,
        description,
        address,
        location,
        category,
        price,
        venuePictures = [],
        ownerInfo = {},
        ownerId
    } = venue;

    const img1 = venuePictures[0]?.img ? getPublicURL(venuePictures[0].img) : '';
    const img2 = venuePictures[1]?.img ? getPublicURL(venuePictures[1].img) : '';

    // 🔍 Get coordinates from PositionStack
    useEffect(() => {
        const fetchCoordinates = async () => {
            if (location && process.env.REACT_APP_MAP_TOKEN) {
                try {
                    const res = await axios.get('https://api.positionstack.com/v1/forward', {
                        params: {
                            access_key: process.env.REACT_APP_MAP_TOKEN,
                            query: location,
                            limit: 1
                        }
                    });
                    if (res.data?.data?.length > 0) {
                        const { latitude, longitude } = res.data.data[0];
                        setLatLng([latitude, longitude]);
                    }
                } catch (err) {
                    console.error("Error fetching coordinates:", err);
                }
            }
        };
        fetchCoordinates();
    }, [location]);

    // 🗺️ Render Leaflet map once
    useEffect(() => {
        if (latLng && !mapRef.current) {
            mapRef.current = L.map('venueMap').setView(latLng, 13);

            const standard = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(mapRef.current);

            const satellite = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            });

            L.marker(latLng).addTo(mapRef.current)
                .bindPopup(`<b>${venueName || "Venue"}</b><br/>Exact location after booking`)
                .openPopup();

            L.control.layers({
                "Standard": standard,
                "Satellite": satellite
            }).addTo(mapRef.current);
        }

        return () => {
            // 🧹 Cleanup map on unmount
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [latLng]);

    if (oneVenueInfo.loading) {
        return (
            <Layout>
                <div className='text-center' style={{ marginTop: '60px' }}>
                    <h1>Getting venue info 🎉</h1>
                    <Spinner animation="border" variant="success" />
                </div>
            </Layout>
        );
    }

    if (!venue._id) {
        return <Navigate to="/" replace />;
    }

    return (
        <Layout>
            <Container>
                <section className="mb-5">
                    <div className="row">
                        <div className="col-md-6 mb-4 mb-md-0">
                            <ImgsCard img1={img1} img2={img2} alt='venue picture' />
                        </div>

                        <div className="col-md-6">
                            <p style={{ fontSize: "22px" }}><strong>{venueName}</strong></p>
                            <p className="mb-2 text-muted text-uppercase small">{category}</p>
                            <p style={{ fontSize: "22px" }}><strong>₹ {price}</strong></p>
                            <hr />
                            <h5>Some words from Dealer -</h5>
                            <p>{description}</p>

                            <hr />
                            <div className="table-responsive">
                                <table className="table table-sm table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>Location</strong></th>
                                            <td>{location}</td>
                                        </tr>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>Address</strong></th>
                                            <td>{address}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr />
                                <table className="table table-sm table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>Dealer Name</strong></th>
                                            {!auth.token ? (
                                                <td rowSpan="2" className="text-muted">
                                                    Login to see the Dealer Details
                                                </td>
                                            ) : (
                                                <td style={{ textTransform: 'capitalize' }}>
                                                    {ownerInfo.ownerName}
                                                </td>
                                            )}
                                        </tr>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>Contact no</strong></th>
                                            {auth.token && <td>{ownerInfo.contactNumber}</td>}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {auth.user?.role === "client" && (
                                <>
                                    <hr />
                                    <Button variant="danger" onClick={() => setBookingModalShow(true)}>Book</Button>
                                </>
                            )}

                            <BookingModel
                                _id={_id}
                                venueName={venueName}
                                price={price}
                                category={category}
                                address={address}
                                location={location}
                                ownerId={ownerId}
                                show={bookingModalShow}
                                onHide={() => setBookingModalShow(false)}
                            />
                        </div>
                    </div>

                    {latLng && (
                        <>
                            <hr />
                            <h5>Venue Location on Map</h5>
                            <div id="venueMap" style={{ height: '300px', width: '100%', borderRadius: '10px' }}></div>
                        </>
                    )}
                </section>
            </Container>
        </Layout>
    );
};

export default VenuePage;
