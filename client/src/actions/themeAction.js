export const dark = (bool) => async (dispatch) => {
  dispatch({
    type: "DARK",
    payload: bool,
  });
};

export const color = (col) => async (dispatch) => {
  dispatch({
    type: "COLOR",
    payload: col,
  });
};
