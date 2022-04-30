import React from "react";
import { Spinner } from "react-bootstrap";
import {
  useAuthState,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import { toast } from 'react-toastify';

const RequiredAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  const [sendEmailVerification, sending, verifyError] =
    useSendEmailVerification(auth);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (user.providerData[0].providerId === 'password' && !user.emailVerified) {
    return (
      <div>
        <h2 className="text-danger">Your Email is Not verified</h2>
        <h5 className="text-success">Please Verify Your Email</h5>
        <button
          className="btn btn-primary"
          onClick={async () => {
            await sendEmailVerification();
            toast("Sent email");
          }}
        >
          send Verification email again
        </button>
      </div>
    );
  }
  return children;
};

export default RequiredAuth;
