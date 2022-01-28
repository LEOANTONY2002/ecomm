import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLocation,
  getLocation,
  updateLocation,
} from "../actions/locationAction";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import "./Cart.scss";
import { createOrder, updateOrder } from "../actions/orderAction";
import Axios from "../axios";
import { useNavigate } from "react-router-dom";

function Cart({ cart, total, upd, user, col1, col2 }) {
  const [chk, setChk] = useState(false);
  const [ship, setShip] = useState(false);
  const [edit, setEdit] = useState(false);
  const username = user?.name;
  const email = user?.email;
  const location = useSelector((state) => state.location.state);
  const order = useSelector((state) => state.order.order);
  const [addr, setAddr] = useState({
    username: user?.name,
    email: user?.email,
    address: "",
    city: "",
    state: "",
    country: "",
    pin: "",
    phone: "",
  });
  const [newOrder, setNewOrder] = useState({
    username,
    email,
    products: [...cart],
    price: total,
    order_id: "",
    payment_id: "",
    signature: "",
    location: [location],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Razorpay = useRazorpay();

  const remove = async (id) => {
    let newCart = await cart.filter((c) => c._id !== id);
    Cookies.set("ecom_cart", JSON.stringify(newCart), { expires: 50 });
    upd();
  };

  const editLoc = () => {
    if (location) {
      setAddr({
        ...addr,
        address: location?.address,
        city: location?.city,
        state: location?.state,
        country: location?.country,
        pin: location?.pin,
        phone: location?.phone,
      });
      setShip(true);
      setEdit(true);
    }
  };

  console.log(location);

  const handlePayment = async () => {
    let amount = "5" + "00";
    const { data } = await Axios.post(`/order/${amount}`);

    //secret = JJuH18GxlFTyA9btM3sYSI9v
    const options = await {
      key: "rzp_test_6lF4BIPebmfLkI", // Enter the Key ID generated from the Dashboard
      amount: toString(total + "00"), // parseInt(total) * 100 Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "LEO Corp",
      description: "Test Transaction",
      image:
        "https://firebasestorage.googleapis.com/v0/b/fir-a30d8.appspot.com/o/ecom%2Fleo%2F1643022982297MEDRY%20full.png?alt=media&token=44fc0bfd-7eef-4f16-b8df-b57f713de542",
      order_id: data, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: async function (response) {
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        await setNewOrder({
          ...newOrder,
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
          location: location,
          products: [...cart],
        });

        await dispatch(
          updateOrder({
            username,
            email,
            products: [...cart],
            price: total,
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            location,
            mode: "raz",
            status: "p",
          })
        );
      },
      prefill: {
        name: "LEO",
        email: "leoantony20025@gmail.com",
        contact: "9791971856",
      },
      notes: {
        address: "Leo Razorpay Corporate Office",
      },
      theme: {
        color: "#008cff",
      },
    };

    const rzp1 = new Razorpay(options);

    console.log(location);

    rzp1.on("payment.failed", function (response) {
      console.log("OOPS   ...  " + response.error.code);
      console.log("OOPS   ...  " + response.error.description);
      console.log("OOPS   ...  " + response.error.source);
      console.log("OOPS   ...  " + response.error.step);
      console.log("OOPS   ...  " + response.error.reason);
      console.log("OOPS   ...  " + response.error.metadata.order_id);
      console.log("OOPS   ...  " + response.error.metadata.payment_id);
    });

    await rzp1.open();
    navigate("/orders");
  };

  return (
    <div className="main">
      {chk ? (
        <>
          {ship ? (
            <div className="ship">
              <img
                className="del"
                src={`https://img.icons8.com/fluency-systems-regular/${col1}/48/document.png`}
              />
              <input
                type="text"
                placeholder="Address"
                value={addr.address}
                onChange={(e) => setAddr({ ...addr, address: e.target.value })}
              />
              <input
                type="text"
                placeholder="City"
                value={addr.city}
                onChange={(e) => setAddr({ ...addr, city: e.target.value })}
              />
              <input
                type="text"
                placeholder="State"
                value={addr.state}
                onChange={(e) => setAddr({ ...addr, state: e.target.value })}
              />
              <input
                type="text"
                placeholder="Country"
                value={addr.country}
                onChange={(e) => setAddr({ ...addr, country: e.target.value })}
              />
              <input
                type="number"
                placeholder="Pin Code"
                value={addr.pin}
                onChange={(e) => setAddr({ ...addr, pin: e.target.value })}
              />
              <input
                type="number"
                placeholder="Phone"
                value={addr.phone}
                onChange={(e) => setAddr({ ...addr, phone: e.target.value })}
              />
              <button
                onClick={async () => {
                  edit
                    ? dispatch(updateLocation(location?._id, addr))
                    : dispatch(createLocation(addr));
                  dispatch(getLocation(user?.email));
                  setShip(false);
                  setEdit(false);
                }}
              >
                {edit ? "Update" : "Submit"}
              </button>
            </div>
          ) : (
            <div className="checkout">
              <div className="loc">
                <div id="lc">
                  <span>Shipping Address</span>
                  <p>{user?.name}</p>
                  <p>{user?.email}</p>
                  <p>{location?.address}</p>
                  <p>{location?.city}</p>
                  <p>{location?.state}</p>
                  <p>{location?.country}</p>
                  <p>{location?.pin}</p>
                  <p>{location?.phone}</p>
                </div>
                <img
                  className="add"
                  title="edit"
                  onClick={() => editLoc()}
                  src={`https://img.icons8.com/nolan/${col2}/64/edit.png`}
                />
              </div>
              <div className="pay">
                <div className="p-left">
                  <span>Cash on delivery</span>
                  <img
                    className="add"
                    src={`https://img.icons8.com/nolan/${col2}/64/get-cash.png`}
                  />
                </div>
                <div className="p-right">
                  <img
                    onClick={() => handlePayment()}
                    className="add"
                    title="remove from cart"
                    src={`https://img.icons8.com/nolan/${col2}/64/bank-cards.png`}
                  />
                  <span>Razorpay</span>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="cart">
            <div className="c-total">
              <p>{total}</p>
            </div>
            <span>
              {cart?.length} <p>items</p>
            </span>
            <div className="c-body">
              {cart != [] && cart != false ? (
                cart?.map((p) => (
                  <div key={p?._id} className="prod product">
                    <div className="p-cont">
                      <div className="pc-price" title="quantity">
                        <span>X</span>
                        <div>{p?.qty}</div>
                      </div>
                      <div className="pc-img">
                        <img src={p?.image} alt="" />
                      </div>
                      <p>{p?.name}</p>
                      <span>{p?.price * p?.qty}</span>
                    </div>
                    <img
                      onClick={() => remove(p?._id)}
                      className="add"
                      title="remove from cart"
                      src={`https://img.icons8.com/nolan/${col1}/64/return-purchase.png`}
                    />
                  </div>
                ))
              ) : cart == false ? (
                <div>No products found...!</div>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
          <div className="ptc">
            <p>proceed to checkout</p>
            <img
              onClick={async () => {
                await dispatch(getLocation(user?.email));
                if (!location) {
                  setShip(true);
                  setChk(true);
                } else {
                  setShip(false);
                  setChk(true);
                }
              }}
              src={`https://img.icons8.com/nolan/${col2}/64/checkout.png`}
              alt="ptc"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
