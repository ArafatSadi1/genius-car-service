import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from '../../firebase.init'
import "./Register.css";
import SocialLogIn from "../SocialLogIn/SocialLogIn";

const Register = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const navigate = useNavigate();

    if(user){
        navigate('/home')
    }

  const handleRegister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(email, password);
  };
  return (
    <div className="form-container">
      <h2>Pleaser Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="name" id="" placeholder="Name" />
        <input
          type="email"
          name="email"
          id=""
          placeholder="Email Address"
          required
        />
        <input
          type="password"
          name="password"
          id=""
          placeholder="Password"
          required
        />
        <input type="checkbox" name="terms" id="terms" />
        <label htmlFor="terms">Accept Genius Car Trems And Condition</label>
        <input className="btn btn-primary w-50 d-block mx-auto mt-3" type="submit" value="Register" />
      </form>
      <p>
        Already have an account?
        <Link to="/login" className="text-danger pe-auto text-decoration-none">
          Please LogIn
        </Link>
      </p>
      <SocialLogIn></SocialLogIn>
    </div>
  );
};

export default Register;
