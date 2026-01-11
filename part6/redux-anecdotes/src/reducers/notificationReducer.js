import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    resetNotification(state, action) {
      return "";
    },
  },
});

let timeoutId = null;

export const showNotification = (message, timeout = 5) => {
  return (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    dispatch(setNotification(message));

    timeoutId = setTimeout(() => {
      dispatch(resetNotification());
      timeoutId = null;
    }, timeout * 1000);
  };
};

export const { setNotification, resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
