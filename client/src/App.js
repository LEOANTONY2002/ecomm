import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Login from "./screens/Login";
import { color, dark } from "./actions/themeAction";
import darkIcon from "./screens/icons/dark.png";
import Header from "./screens/components/Header";
import Banner from "./screens/components/Banner";
import Home from "./screens/Home";
import {
  allProducts,
  productDetail,
  userProducts,
} from "./actions/productAction";
import Detail from "./screens/Detail";
import Products from "./screens/Products";
import Cart from "./screens/Cart";
import Orders from "./screens/Orders";
import Profile from "./screens/Profile";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user);
  const p = useSelector((state) => state.product.detail);
  const up = useSelector((state) => state.product.userProducts);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [col1, setCol1] = useState("");
  const [col2, setCol2] = useState("");

  useEffect(async () => {
    setCol1(
      theme.color == "b" ? "0059ff" : theme.color == "g" ? "ffbb00" : "ff00dd"
    );
    setCol2(theme.dark ? "000000" : "ffffff");
  }, [theme]);

  useEffect(() => {
    dispatch(allProducts());
  }, []);

  useEffect(() => {
    dispatch(productDetail(p));
  }, [p]);

  useEffect(() => {
    const fetch = async () => {
      if (Cookies.get("ecom_cart")) {
        const crt = await JSON.parse(Cookies.get("ecom_cart"));
        if (crt) setCart(crt);
        console.log(cart);
        if (crt) {
          let ttl = 0;
          for (let i = 0; i < crt.length; i++) {
            ttl = parseInt(crt[i].price) * parseInt(crt[i].qty) + ttl;
            console.log(ttl);
            setTotal(ttl);
          }
        }
      }
    };
    fetch();
  }, []);

  const updateCart = () => {
    const fetch = async () => {
      const crt = await JSON.parse(Cookies.get("ecom_cart"));
      if (crt) setCart(crt);
      console.log(cart);
      if (crt) {
        let ttl = 0;
        for (let i = 0; i < crt.length; i++) {
          ttl = parseInt(crt[i].price) * parseInt(crt[i].qty) + ttl;
          console.log(ttl);
          setTotal(ttl);
        }
      }
    };
    fetch();
  };

  useEffect(() => {
    user && dispatch(userProducts(user?.email));
  }, []);

  const updateProducts = () => {
    user && dispatch(userProducts(user?.email));
    dispatch(allProducts());
  };

  console.log(user);

  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty(
      "--bc",
      theme.dark && theme.color == "b"
        ? "#001d31"
        : theme.dark && theme.color == "g"
        ? "#312400"
        : theme.dark && theme.color == "p"
        ? "#310031"
        : !theme.dark && theme.color == "b"
        ? "#d6f0fc"
        : !theme.dark && theme.color == "g"
        ? "#fcf8d6"
        : "#fcd6fc"
    );
    root?.style.setProperty("--tc", theme.dark ? "white" : "black");
    root?.style.setProperty("--bs", theme.dark ? "#111" : "#4b4a4a36");
    root?.style.setProperty("--bc2", theme.dark ? "#2b2a2a" : "white");
    root?.style.setProperty("--bc3", theme.dark ? "black" : "whitesmoke");
    root?.style.setProperty(
      "--col1",
      theme.color == "b"
        ? "#008cff"
        : theme.color == "g"
        ? "#eeff00"
        : "#fa4ee3"
    );
    root?.style.setProperty(
      "--col2",
      theme.color == "b"
        ? "#0059ff"
        : theme.color == "g"
        ? "#ffbb00"
        : "#ff00bf"
    );
    root?.style.setProperty(
      "--col3",
      theme.color == "b"
        ? "#00a2ff70"
        : theme.color == "g"
        ? "#eeff0071"
        : "#e100ff75"
    );
  }, [theme]);

  const mode = () => {
    theme.dark ? dispatch(dark(false)) : dispatch(dark(true));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/orders"
            element={
              user !== [] ? (
                <>
                  <Header cartlen={cart.length} name={"orders"} />
                  <Banner name={"orders"} />
                  <Orders email={user?.email} col1={col1} col2={col2} />
                </>
              ) : (
                <>
                  <Header cartlen={cart.length} name={"login"} />
                  <Banner name={"login"} />
                  <Login user={user} col1={col1} col2={col2} />
                </>
              )
            }
          />
          <Route
            path="/cart"
            element={
              user !== [] ? (
                <>
                  <Header cartlen={cart.length} name={"cart"} />
                  <Banner name={"cart"} />
                  <Cart
                    cart={cart}
                    total={total}
                    upd={updateCart}
                    user={user}
                    col1={col1}
                    col2={col2}
                  />
                </>
              ) : (
                <>
                  <Header cartlen={cart.length} name={"login"} />
                  <Banner name={"login"} />
                  <Login user={user} col1={col1} col2={col2} />
                </>
              )
            }
          />
          <Route
            path="/products"
            element={
              user !== [] ? (
                <>
                  <Header cartlen={cart.length} name={"products"} />
                  <Banner name={"products"} />
                  <Products
                    uname={user?.name}
                    umail={user?.email}
                    products={up}
                    updateProducts={updateProducts}
                    col1={col1}
                    col2={col2}
                  />
                </>
              ) : (
                <>
                  <Header cartlen={cart.length} name={"login"} />
                  <Banner name={"login"} />
                  <Login user={user} col1={col1} col2={col2} />
                </>
              )
            }
          />
          <Route
            path="/product/:id"
            element={
              <>
                <Header cartlen={cart.length} name={"home"} />
                <Banner name={"product detail"} />
                <Detail
                  product={p}
                  id={p?._id}
                  cart={cart}
                  updateCart={updateCart}
                  col1={col1}
                  col2={col2}
                />
              </>
            }
          />
          <Route
            path="/login"
            element={
              user.length !== 0 ? (
                <>
                  <Header cartlen={cart.length} name={"login"} />
                  <Banner name={"login"} />
                  <Profile us={user} col1={col1} col2={col2} />
                </>
              ) : (
                <>
                  <Header cartlen={cart.length} name={"login"} />
                  <Banner name={"login"} />
                  <Login user={user} col1={col1} col2={col2} />
                </>
              )
            }
          />
          <Route
            path="/"
            element={
              <div>
                <Header cartlen={cart.length} name={"home"} />
                <Banner name={"home"} />
                <Home col1={col1} col2={col2} />
              </div>
            }
          />
        </Routes>
        <div className="colors">
          <img onClick={() => mode()} src={darkIcon} alt="dark" />
          <span onClick={() => dispatch(color("b"))} className="blue"></span>
          <span onClick={() => dispatch(color("g"))} className="gold"></span>
          <span onClick={() => dispatch(color("p"))} className="pink"></span>
        </div>
      </div>
    </Router>
  );
}

export default App;
