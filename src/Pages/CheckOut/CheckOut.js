import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useServiceDetail from "../../hooks/useServiceDetail";
import PageTitle from "../Shared/PageTitle/PageTitle";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import axios from "axios";
import { toast } from "react-toastify";

const CheckOut = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetail(serviceId);
  const [user] = useAuthState(auth);
  // const [user, setUser] = useState({
  //     name: 'Akbor the great',
  //     email: 'momo@taj.com',
  //     address: 'tajmohol road, md.pur',
  //     phone: '01711111111'
  // })
  // const handleAddressChange = event =>{
  //     const {address, ...rest} = user;
  //     const newAddress = event.target.value;
  //     const newUser = {address: newAddress, ...rest}
  //     setUser(newUser)
  // }
  const handleOrderPlace = (event) => {
    event.preventDefault();
    const order = {
      email: user.email,
      service: service.name,
      serviceId: serviceId,
      phone: event.target.phone.value,
      address: event.target.address.value,
    };
    axios
      .post("https://stark-falls-67848.herokuapp.com/order", order)
      .then((response) => {
        const { data } = response;
        console.log(data);
        toast("Your Order is Placed...");
      });
  };
  return (
    <div className="w-50 mx-auto my-3">
      <PageTitle title={"Checkout"}></PageTitle>
      <h2>Please Order:{service.name}</h2>
      <form onSubmit={handleOrderPlace}>
        <input
          className="w-100 mb-2"
          type="text"
          name="name"
          value={user.displayName}
          placeholder="name"
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="email"
          value={user.email}
          placeholder="email"
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="service"
          value={service.name}
          placeholder="service"
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="phone"
          placeholder="phone"
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="address"
          placeholder="address"
        />
        <br />
        <input className="btn btn-primary" type="submit" value="Place Order" />
      </form>
    </div>
  );
};

export default CheckOut;
