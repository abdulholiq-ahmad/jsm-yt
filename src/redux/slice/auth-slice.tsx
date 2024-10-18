import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  profile: localStorage.getItem("profile") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", state.token ?? "");
    },

    logOut: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    profile: (state, action) => {
      state.profile = action.payload;
      localStorage.setItem("profile", state.profile ?? "");
    },
  },
});

export const { signIn, logOut } = authSlice.actions;
export default authSlice.reducer;
