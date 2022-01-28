import React, { useEffect, useState } from "react";
import "./Header.scss";
import menuIcon from "../icons/menu.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header({ name, cartlen }) {
  const theme = useSelector((state) => state.theme);
  const [color, setColor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setColor(
      theme.color == "b" ? "0059ff" : theme.color == "g" ? "ffbb00" : "ff00dd"
    );
  }, [theme]);

  return (
    <>
      <div className="header">
        <div className="title">
          <img
            src={`https://img.icons8.com/nolan/${color}/64/shopping-cart.png`}
          />
          <p>ecom</p>
        </div>
        <div className="cont">
          <p>
            <Link
              to="/login"
              style={{ color: name == "login" && "var(--col2)" }}
            >
              signin
            </Link>
          </p>
          <p>
            <Link to="/" style={{ color: name == "home" && "var(--col2)" }}>
              home
            </Link>
          </p>
          <p>
            <Link
              to="/products"
              style={{ color: name == "products" && "var(--col2)" }}
            >
              products
            </Link>
          </p>
          <p>
            <Link to="/cart" style={{ color: name == "cart" && "var(--col2)" }}>
              cart
            </Link>
          </p>
          <p>
            <Link
              to="/orders"
              style={{ color: name == "orders" && "var(--col2)" }}
            >
              orders
            </Link>
          </p>
        </div>
        <div onClick={() => navigate("/cart")} className="h-cart">
          <img
            src={`https://img.icons8.com/nolan/${color}/64/shopping-cart-loaded.png`}
          />
          <p>{cartlen}</p>
        </div>
        <div className="m-ic">
          <img id="menuicon" src={menuIcon} alt="" />
        </div>
        <div className="menu">
          <div className="m-field">
            <Link to="/">
              <img
                src={`https://img.icons8.com/fluency-systems-filled/${color}/48/home.png`}
              />
            </Link>
            <span>Home</span>
          </div>
          <div className="m-field">
            <Link to="/login">
              <img
                src={`https://img.icons8.com/fluency-systems-filled/${color}/48/user.png`}
              />
            </Link>
            <span>Signin</span>
          </div>
          <div className="m-field">
            <Link to="/cart">
              <img
                src={`https://img.icons8.com/fluency-systems-filled/${color}/48/shopping-cart-loaded.png`}
              />
            </Link>
            <span>Cart</span>
          </div>
          <div className="m-field">
            <Link to="/orders">
              <img
                src={`https://img.icons8.com/fluency-systems-filled/${color}/48/purchase-order.png`}
              />
            </Link>
            <span>Orders</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
