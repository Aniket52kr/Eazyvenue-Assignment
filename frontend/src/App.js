import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PrivateRoute from './components/HOC/PrivateRoute';

import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import ProfilePage from './containers/Profile';
import VenuePage from './containers/Venue';
import { PaymentStatus } from './containers/PaymentStatus';


import EditVenue from './components/UI/EditVenue'; 

import { isUserLoggedIn } from './actions/auth.actions';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate, dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/venue/:id" element={<VenuePage />} />
          <Route path="/payment-status" element={<PaymentStatus />} />

          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          {/* ✅ Added EditVenue route */}
          <Route
            path="/venue/edit/:venueId"
            element={
              <PrivateRoute>
                <EditVenue />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
