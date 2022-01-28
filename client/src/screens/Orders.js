import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../actions/orderAction";
import "./Orders.scss";

function Orders({ email, col1, col2 }) {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(getOrders(email));
  }, []);

  return (
    <div className="main">
      {orders !== [] ? (
        orders?.map((o) => (
          <div className="order">
            <div key={o?._id} className="o-body cart">
              <div className="o-date">
                <span>
                  {o?.createdAt.split(" ")[0] +
                    " " +
                    o?.createdAt.split(" ")[1] +
                    " " +
                    o?.createdAt.split(" ")[2]}
                </span>
              </div>
              <div className="c-loc">
                <img
                  title="Location"
                  src={`https://img.icons8.com/nolan/818080/64/marker.png`}
                />
                <p>{o?.location?.city}</p>
              </div>
              <div className="c-total">
                <p>{o?.price}</p>
              </div>
              <div className="c-body">
                {o?.products != [] ? (
                  o?.products?.map((p) => (
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
                    </div>
                  ))
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </div>
            <div className="o-status">
              <img
                title="Track Order"
                src={`https://img.icons8.com/nolan/${col1}/64/track-order.png`}
              />
              <p>Order placed</p>
            </div>
          </div>
        ))
      ) : (
        <div>No orders placed yet ... !</div>
      )}
    </div>
  );
}

export default Orders;
