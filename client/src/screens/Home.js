import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productDetail } from "../actions/productAction";
import "./Home.scss";
import detailIcon from "./icons/detail.png";

function Home() {
  const products = useSelector((state) => state.product.allProducts) | [];
  const product = useSelector((state) => state.product.detail);
  const theme = useSelector((state) => state.theme);
  const [color, setColor] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setColor(
      theme.color == "b" ? "0059ff" : theme.color == "g" ? "ffbb00" : "ff00dd"
    );
  }, [theme]);

  console.log(products);

  const detail = (p) => {
    dispatch(productDetail(p));
    console.log(product);
    navigate(`/product/${p._id}`);
  };

  return (
    <>
      <div className="main">
        {products?.length !== 0 ? (
          products?.map((p) => (
            <div key={p?._id} className="prod">
              <div className="p-cont">
                <div className="pc-img">
                  <img src={p?.image} alt="" />
                </div>
                <p>{p?.name}</p>
                <span>{p?.price}</span>
              </div>
              <img
                onClick={() => detail(p)}
                className="add"
                src={`https://img.icons8.com/nolan/${color}/64/add-shopping-cart.png`}
              />
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}

export default Home;

//₹
