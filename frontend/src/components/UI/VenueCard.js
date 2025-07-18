import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getOneVenue } from '../../actions/venue.actions';
import { getPublicURL } from '../../urlConfig';
import { ImgsCard } from './ImgsCard';
import { useDispatch, useSelector } from 'react-redux';
import BookingModel from './BookingModel';

const VenueCard = (props) => {
  const [bookingModalShow, setBookingModalShow] = useState(false);
  const { img1, img2, category, venueName, ownerId, _id, price, location, address, style, isDelete } = props;

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const getVenueInfo = () => {
    dispatch(getOneVenue(_id));
  };

  return (
    <div className="card mb-4 box-shadow">
      <ImgsCard
        img1={getPublicURL(img1)}
        img2={getPublicURL(img2)}
        alt='venue picture'
        style={style}
      />
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">{category}</h6>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">{venueName}</h5>
          <h5 className="card-title">₹ {price}</h5>
        </div>
        <h6 className="card-subtitle mb-2 text-muted">{location}, {address}</h6>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="btn-group">
            <Link to={`/venue/${_id}`}>
              <Button variant="primary" size="sm" className="me-2" onClick={getVenueInfo}>
                Details
              </Button>
            </Link>

            {auth.user && auth.user.role === 'dealer' && auth.user._id === ownerId && (
              <Link to={`/venue/edit/${_id}`}>
                <Button variant="warning" size="sm" className="me-2">
                  Edit
                </Button>
              </Link>
            )}
          </div>

          {isDelete === true ? (
            <Button variant="danger" size="sm" disabled>
              Deleted
            </Button>
          ) : (
            auth.user?.role !== 'dealer' && (
              <Button variant="danger" size="sm" onClick={() => setBookingModalShow(true)}>
                Book
              </Button>
            )
          )}
        </div>

        <BookingModel
          _id={_id}
          venueName={venueName}
          price={price}
          category={category}
          address={address}
          location={location}
          show={bookingModalShow}
          ownerId={ownerId}
          onHide={() => setBookingModalShow(false)}
        />
      </div>
    </div>
  );
};

export default VenueCard;
