export const productReducer = (
  state = { allProducts: [], userProducts: [], product: [], detail: [] },
  action
) => {
  switch (action.type) {
    case "ALL_PRODUCTS":
      return {
        ...state,
        allProducts: action.payload,
        userProducts: state.userProducts,
      };

    case "USER_PRODUCTS":
      return {
        ...state,
        userProducts: action.payload,
        allProducts: state.allProducts,
      };

    case "PRODUCT_DETAIL":
      return {
        ...state,
        userProducts: state.userProducts,
        allProducts: state.allProducts,
        detail: action.payload,
      };

    case "CREATE_PRODUCT":
      return {
        ...state,
        userProducts: state.userProducts,
        allProducts: state.allProducts,
        product: action.payload,
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        userProducts: state.userProducts,
        allProducts: state.allProducts,
        product: action.payload,
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        userProducts: state.userProducts,
        allProducts: state.allProducts,
        product: action.payload,
      };

    default:
      return state;
  }
};
