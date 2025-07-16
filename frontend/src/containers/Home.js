import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/index.layout';
import { Container, Spinner } from 'react-bootstrap';
import VenueCard from '../components/UI/VenueCard';
import { useDispatch, useSelector } from 'react-redux';
import { getVenues } from '../actions/venue.actions';
import { isEmpty } from '../helpers/isObjEmpty';

function Home() {
    document.title = "Venue Booking App | Home";

    const allVenuesInfo = useSelector(state => state.allVenuesInfo);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVenues());
    }, []);

    if (allVenuesInfo.loading) {
        return (
            <Layout>
                <div className='text-center' style={{ marginTop: '60px' }}>
                    <h1>Getting all venues 🎉</h1>
                    <Spinner animation="border" variant="success" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Container>
                <div className="row">
                    {
                        isEmpty(allVenuesInfo.allVenues) ? (
                            <div className='text-center' style={{ marginTop: '60px' }}>
                                <h1>
                                    No Venues currently 😢<br />
                                    Check again after some time
                                </h1>
                            </div>
                        ) : (
                            allVenuesInfo.allVenues.map((venue) => {
                                const {
                                    _id,
                                    venueName,
                                    address,
                                    location,
                                    category,
                                    price,
                                    venuePictures = [],
                                    ownerId
                                } = venue;

                                const img1 = venuePictures[0]?.img || '';
                                const img2 = venuePictures[1]?.img || '';

                                return (
                                    <div className="col-md-4" key={_id}>
                                        <VenueCard
                                            img1={img1}
                                            img2={img2}
                                            venueName={venueName}
                                            _id={_id}
                                            userId={auth.user?._id}
                                            category={category}
                                            address={address}
                                            location={location}
                                            price={price}
                                            ownerId={ownerId}
                                            style={{ width: "800px", height: "200px" }}
                                        />
                                    </div>
                                );
                            })
                        )
                    }
                </div>
            </Container>
        </Layout>
    );
}

export default Home;
