import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const handleRegister = event =>{
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(name, email, password);
    }
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
        <input type="submit" value="Register" />
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="text-danger pe-auto text-decoration-none">
          Please LogIn
        </Link>
      </p>
    </div>
  );
};

export default Register;
