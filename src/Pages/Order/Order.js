import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import axiosPrivate from "../../axiosPrivate/axiosPrivate";
import auth from "../../firebase.init";

const Order = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getOrders = async () => {
      try {
        const email = user?.email;
        const url = `https://stark-falls-67848.herokuapp.com/order?email=${email}`;
        const { data } = await axiosPrivate.get(url);
        setOrders(data);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          signOut(auth);
          navigate("/login");
        }
      }
    };
    getOrders();
  }, [user]);
  return (
    <div className="w-50 mx-auto my-3">
      <h2>Your Order: {orders.length}</h2>
      {
        orders.map(order => <div key={order._id}>
          <p>{order.email}: {order.service}</p>
        </div>)
      }
    </div>
  );
};

export default Order;
