// features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Get user from localStorage
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Store user in localStorage
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Clear user from localStorage
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
