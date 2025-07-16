import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './components/HOC/PrivateRoute';
import Home from './containers/Home';
import Signin from './containers/Signin';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions/auth.actions';
import Signup from './containers/Signup';
import ProfilePage from './containers/Profile';
import VenuePage from './containers/Venue';
import { PaymentStatus } from './containers/PaymentStatus';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth); // FIXED: useSelector instead of useDispatch

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate, dispatch]); // added deps for good practice

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/venue/:id" element={<VenuePage />} />
          <Route path="/payment-status" element={<PaymentStatus />} />

          {/* PrivateRoute wrapper in v6 style */}
          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
