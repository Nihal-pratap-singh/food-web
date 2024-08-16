import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    alternativeNumber: "",
    country: ""
  });

  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    const orderItems = food_list.filter(item => cartItems[item._id] > 0)
                                 .map(item => ({ ...item, quantity: cartItems[item._id] }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      userId: token?.userId,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      const errorMessage = error.response?.data?.error || "Error placing order. Please try again later.";
      alert(errorMessage);
    }
  };

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>DELIVERY INFORMATION</p>
        <div className='multi-feilds'>
          <input required name='firstName' onChange={onchangeHandler} value={data.firstName} type='text' placeholder='First name' />
          <input required name='lastName' onChange={onchangeHandler} value={data.lastName} type='text' placeholder='Last name' />
        </div>
        <input required name='email' onChange={onchangeHandler} value={data.email} type='email' placeholder='Email' />
        <input required name='street' onChange={onchangeHandler} value={data.street} type='text' placeholder='Street' />
        <div className='multi-feilds'>
          <input required name='city' onChange={onchangeHandler} value={data.city} type='text' placeholder='City' />
          <input required name='state' onChange={onchangeHandler} value={data.state} type='text' placeholder='State' />
        </div>
        <div className='multi-feilds'>
          <input required name='pincode' onChange={onchangeHandler} value={data.pincode} type='text' placeholder='Pin Code' />
          <input required name='phone' onChange={onchangeHandler} value={data.phone} type='text' placeholder='Phone' />
        </div>
        <input required name='alternativeNumber' onChange={onchangeHandler} value={data.alternativeNumber} type='text' placeholder='Alternate Phone' />
        <input required name='country' onChange={onchangeHandler} value={data.country} type='text' placeholder='Country' />
      </div>
      <div className='place-order-right'>
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery-Charge</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
