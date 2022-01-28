export const themeReducer = (state = { dark: true, color: "b" }, action) => {
  switch (action.type) {
    case "DARK":
      return { ...state, dark: action.payload, color: state.color };

    case "COLOR":
      return { ...state, color: action.payload, dark: state.dark };

    default:
      return state;
  }
};
