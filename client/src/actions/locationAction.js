import Axios from "../axios";

export const getLocation = (email) => async (dispatch) => {
  try {
    const { data } = await Axios.get(`/location/${email}`);
    dispatch({ type: "LOCATION", payload: data || [] });
  } catch (error) {
    dispatch({ type: "LOCATION", payload: [] });
  }
};

export const createLocation = (location) => async (dispatch) => {
  try {
    const { data } = await Axios.post("/location", location);
    dispatch({ type: "LOCATION", payload: data });
  } catch (error) {
    dispatch({ type: "LOCATION", payload: [] });
  }
};

export const updateLocation = (id, location) => async (dispatch) => {
  try {
    const { data } = await Axios.put("/location", { ...location, _id: id });
    dispatch({ type: "LOCATION", payload: data });
  } catch (error) {
    dispatch({ type: "LOCATION", payload: [] });
  }
};

export const deleteLocation = () => async (dispatch) => {
  try {
    const { data } = await Axios.delete("/location");
    dispatch({ type: "LOCATION", payload: [] });
  } catch (error) {
    dispatch({ type: "LOCATION", payload: [] });
  }
};
