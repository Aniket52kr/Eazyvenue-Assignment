import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../helpers/axios';

const BookingModel = (props) => {
  const { _id, venueName, price, category, location, address, ownerId } = props;

  // ✅ Fix: properly formatted default date
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [isLoading, setIsLoading] = useState(false);

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gotoCheckoutPage = async (e) => {
    e.preventDefault();

    if (!auth.authenticate) {
      navigate('/signin');
      return;
    }

    setIsLoading(true);

    const dealInfo = {
      venueId: _id,
      venueName,
      venueOwnerId: ownerId,
      bill: price,
      eventDate: date
    };

    try {
      const res = await axios.post(`/checkout`, dealInfo);
      localStorage.setItem('dealId', JSON.stringify(res.data.dealId));
      window.location.href = res.data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Booking Details 📝
        </Modal.Title>
        <Button onClick={props.onHide}>X</Button>
      </Modal.Header>

      <Modal.Body>
        <h5>
          <span style={{ color: 'red' }}><strong>Note: </strong></span>
          Before booking, always contact the owner
        </h5>
        <hr />

        <Form onSubmit={gotoCheckoutPage}>
          <Row>
            <Col md={6}>
              <Input
                label='Select the Date for Event'
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Input
                label='Venue Name'
                type='text'
                value={venueName}
                isReadOnly={true}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Input
                label='Category'
                type='text'
                value={category}
                isReadOnly={true}
              />
            </Col>
            <Col md={6}>
              <Input
                label='Location'
                type='text'
                value={location}
                isReadOnly={true}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Input
                label='Address'
                type='text'
                value={address}
                isReadOnly={true}
              />
            </Col>
            <Col md={6}>
              <Input
                label='Bill'
                type='number'
                value={price}
                isReadOnly={true}
                message='With Service tax included in Bill'
              />
            </Col>
          </Row>

          <div className="text-center">
            <Button variant="success" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner animation="border" as="span" size="sm" variant="light" />
                  {' '} Processing...
                </>
              ) : (
                'Payment'
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookingModel;
