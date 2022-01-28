import Cookies from "js-cookie";

let u =
  (Cookies.get("ecom_user") && JSON.parse(Cookies.get("ecom_user"))) || [];

export const userReducer = (state = u, action) => {
  switch (action.type) {
    case "SIGNUP":
      return { state: action.payload };

    case "LOGIN":
      return { state: action.payload };

    default:
      return state;
  }
};

// export const registerReducer = (state = [], action) => {
//   console.log(action);
//   switch (action.type) {
//     case "REGISTER_REQUEST":
//       return { loading: true, user: action.payload };
//     case "REGISTER_SUCCESS":
//       return { loading: false, user: action.payload };
//     case "REGISTER_FAIL":
//       return { loading: false, user: false, fail: action.payload };
//     default:
//       return state;
//   }
// };

// export const loginReducer = (state = [], action) => {
//   console.log(action);
//   switch (action.type) {
//     case "LOGIN_REQUEST":
//       return { loading: true, user: action.payload };
//     case "LOGIN_SUCCESS":
//       return { loading: false, user: action.payload };
//     case "LOGIN_FAIL":
//       return { loading: false, user: false, fail: action.payload };
//     default:
//       return state;
//   }
// };
