import React, { useEffect, useState } from "react";
import "./Detail.scss";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { productDetail } from "../actions/productAction";

function Detail({ id, product, cart, updateCart }) {
  const theme = useSelector((state) => state.theme);
  var stock = [];
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inCart, setInCart] = useState(false);
  const [added, setAdded] = useState(false);

  console.log(cart);

  useEffect(() => {
    console.log(product);
    const checkCart = async () => {
      const det = await dispatch(productDetail(product));
      const ct = (await JSON.parse(Cookies.get("ecom_cart") || [])) || [];
      const p = await ct?.find((c) => {
        return c._id.toString() == id.toString();
      });
      if (p) {
        setInCart(true);
      }
    };
    if (Cookies.get("ecom_cart")) checkCart();
  }, [added, inCart, product]);

  const fixStock = () => {
    for (let i = 1; i <= parseInt(product?.stock); i++) {
      stock.push(i);
    }
  };
  fixStock();

  const addToCart = async () => {
    console.log("adding to the cart...!");
    var arr = [];
    cart?.map((c) => arr.push(c));
    arr.push({
      ...product,
      qty,
    });
    const c = await Cookies.set("ecom_cart", JSON.stringify(arr), {
      expires: 50,
    });
    updateCart();
    if (c) setAdded(true);
  };

  console.log(stock);

  return (
    <>
      {product && (
        <div className="main">
          <div className="d-main">
            <div className="dm-title">
              <h5>{product?.name}</h5>
              <p>{product?.desc}</p>
              <img
                onClick={() =>
                  navigator.share({
                    title: document.title,
                    text: product?.name,
                    url: window.location.href,
                  })
                }
                src={
                  theme.dark
                    ? "https://img.icons8.com/ios/50/000000/forward-arrow.png"
                    : "https://img.icons8.com/ios/50/ffffff/forward-arrow.png"
                }
              />
            </div>
            <div className="dm-img">
              <p>{product?.name}</p>
              <img src={product?.image} />
            </div>
            {stock ? (
              <div className="dm-detail">
                <div>
                  <span>Qty </span>
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {stock?.map((s) => (
                      <option key={s + Math.random()} value={s}>
                        {" "}
                        {s}{" "}
                      </option>
                    ))}
                  </select>
                </div>
                {added && <span>Added to the cart...!</span>}
                <div className="dm-btns">
                  <button
                    onClick={
                      added || inCart
                        ? () => navigate("/cart")
                        : () => addToCart()
                    }
                  >
                    {inCart || added ? "GO" : "ADD"} TO CART
                  </button>
                  <h5 onClick={() => navigate("/")}>BACK</h5>
                </div>
                <p>52000</p>
              </div>
            ) : (
              <span className="oos">out of stock</span>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Detail;
