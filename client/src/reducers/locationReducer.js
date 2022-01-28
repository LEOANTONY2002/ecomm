export const locationReducer = (state = [], action) => {
  switch (action.type) {
    case "LOCATION":
      return { state: action.payload };

    default:
      return state;
  }
};
