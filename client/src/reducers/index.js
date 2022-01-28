import { combineReducers } from "redux";
import { locationReducer } from "./locationReducer";
import { orderReducer } from "./orderReducer";
import { productReducer } from "./productReducer";
import { themeReducer } from "./themeReducer";
import { userReducer } from "./userReducer";

const allReducers = combineReducers({
  theme: themeReducer,
  user: userReducer,
  product: productReducer,
  location: locationReducer,
  order: orderReducer,
});

export default allReducers;
