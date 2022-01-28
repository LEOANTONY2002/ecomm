import Axios from "../axios";

export const createProduct = (product) => async (dispatch) => {
  try {
    const { data } = await Axios.post("/product", product);
    dispatch({ type: "CREATE_PRODUCT", payload: data });
  } catch (error) {
    dispatch({ type: "CREATE_PRODUCT", payload: error });
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  try {
    const { data } = await Axios.put("/product", { ...product, _id: id });
    dispatch({ type: "UPDATE_PRODUCT", payload: data });
  } catch (error) {
    dispatch({ type: "UPDATE_PRODUCT", payload: error });
  }
};

export const userProducts = (email) => async (dispatch) => {
  try {
    const { data } = await Axios.get(`/product/user/${email}`);
    dispatch({ type: "USER_PRODUCTS", payload: data });
  } catch (error) {
    dispatch({ type: "USER_PRODUCTS", payload: error });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const { data } = await Axios.delete(`/product/${id}`);
    dispatch({ type: "DELETE_PRODUCT", payload: data });
  } catch (error) {
    dispatch({ type: "DELETE_PRODUCT", payload: error });
  }
};

export const allProducts = () => async (dispatch) => {
  try {
    const { data } = await Axios.get("/product/all");
    dispatch({ type: "ALL_PRODUCTS", payload: data });
  } catch (error) {
    dispatch({ type: "ALL_PRODUCTS", payload: [] });
  }
};

export const productDetail = (product) => async (dispatch) => {
  dispatch({ type: "PRODUCT_DETAIL", payload: product });
};

export const getByCategory = (category) => async (dispatch) => {
  try {
    const { data } = await Axios.get(`/product/category/${category}`);
    dispatch({ type: "CATEGORY", payload: data });
  } catch (error) {
    dispatch({ type: "CATEGORY", payload: error });
  }
};
