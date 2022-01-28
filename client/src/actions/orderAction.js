import Axios from "../axios";

export const createOrder = (order) => async (dispatch) => {
  try {
    const { data } = await Axios.post("/order", order);
    dispatch({ type: "ORDER", payload: data });
  } catch (error) {
    dispatch({ type: "ORDER", payload: error });
  }
};

export const updateOrder = (order) => async (dispatch) => {
  try {
    const { data } = await Axios.put("/order", order);
    dispatch({ type: "ORDER", payload: data });
  } catch (error) {
    dispatch({ type: "ORDER", payload: error });
  }
};

export const getOrders = (email) => async (dispatch) => {
  try {
    const { data } = await Axios.get(`/order/${email}`);
    dispatch({ type: "ORDERS", payload: data });
  } catch (error) {
    dispatch({ type: "ORDERS", payload: error });
  }
};
