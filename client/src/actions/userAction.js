import axios from "../axios";
import Cookies from "js-cookie";

export const signup = (name, email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post("/user/signup", {
      name,
      email,
      password,
    });
    await dispatch({ type: "SIGNUP", payload: data });
    if (data.status) {
      Cookies.set("ecom_user", JSON.stringify(data), { expires: 37 });
    } else Cookies.set("ecom_user", JSON.stringify([]));
  } catch (error) {
    dispatch({ type: "SIGNUP", payload: [] });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post("/user/login", {
      email,
      password,
    });
    await dispatch({ type: "LOGIN", payload: data });
    if (data.status) {
      Cookies.set("ecom_user", JSON.stringify(data), { expires: 37 });
    } else Cookies.set("ecom_user", JSON.stringify([]));
  } catch (error) {
    dispatch({ type: "LOGIN", payload: false });
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post("/user/update", user);
    await dispatch({ type: "LOGIN", payload: data });
    Cookies.set("ecom_user", JSON.stringify(data), { expires: 37 });
  } catch (error) {
    dispatch({ type: "LOGIN", payload: false });
  }
};
