import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import SocialLogIn from "../SocialLogIn/SocialLogIn";
import PageTitle from "../Shared/PageTitle/PageTitle";
import axios from "axios";
import useToken from "../../hooks/useToken";

const LogIn = () => {
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
  const location = useLocation();
  const [token] = useToken(user);
  let errorElement;

  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }

  if (error) {
    errorElement = <p className="text-danger">Error: {error.message}</p>;
  }
  const handleLogIn = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    await signInWithEmailAndPassword(email, password);

  };

  const handleResetPassword = async () => {
    const email = emailRef.current.value;
    await sendPasswordResetEmail(email);
    alert("Sent email");
  };
  return (
    <div className="w-50 mx-auto">
      <PageTitle title={"Login"}></PageTitle>
      <h2 className="text-primary text-center mt-3">Please LogIn</h2>
      <Form onSubmit={handleLogIn}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        {errorElement}
        <Button
          className="w-50 d-block mx-auto my-3 py-2"
          variant="primary"
          type="submit"
        >
          Log In
        </Button>
      </Form>
      <p>
        New in Genius Car?
        <Link
          to="/register"
          className="text-primary ms-2 pe-auto text-decoration-none"
        >
          Please Register
        </Link>
      </p>
      <p>
        Forgot your password?
        <Link
          to="/home"
          onClick={handleResetPassword}
          className="text-primary ms-2 pe-auto text-decoration-none"
        >
          Reset Password
        </Link>
      </p>
      <SocialLogIn></SocialLogIn>
    </div>
  );
};

export default LogIn;
