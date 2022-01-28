export const orderReducer = (state = { orders: [], order: [] }, action) => {
  switch (action.type) {
    case "ORDERS":
      return { ...state, orders: action.payload };

    case "ORDER":
      return { ...state, order: action.payload };

    default:
      return state;
  }
};
