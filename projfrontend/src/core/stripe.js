import React, { useState, useEffect } from "react";
import { isAuthanticate } from "../auth/helper";
import { loadCart, EmptyCart } from "./helper/CardHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import {createOrder} from './helper/OrderHelper'

const StripeCheckout = ({
  products,
  setReload = f => f,
  reload = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  });

  const token = isAuthanticate() && isAuthanticate().token;
  const userId = isAuthanticate() && isAuthanticate().user._id;

  const getFinalAmount = () => {
    console.log("products",products);
    let amount = 0;
   products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = token => {
    const body = {
      token,
      products
    };
    const headers = {
      "Content-Type": "application/json"
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
 
    })
      .then(response => {
        console.log(response);
        //call further methods
        const{status}=response;
        console.log("STATUS",status)
        {EmptyCart()}
      })
      .catch(error => console.log(error));
  };

  const showStripeButton = () => {
    return isAuthanticate() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_eyCnJJe3DxGiJxrLtESL0ZHX001p1rJ2PW"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
