import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  loginUserRole:"ROLE_USER"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login_: (state,action) => {
      state.isLoggedIn = true;
      state.loginUserRole=action.payload

    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.loginUserRole =""
    },
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { login_, logout, setLoginStatus } = authSlice.actions;
export default authSlice.reducer;
