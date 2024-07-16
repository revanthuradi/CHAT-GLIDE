import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialValues = JSON.parse(localStorage.getItem("userData")) || {
  userID: "",
  userName: "",
  email: "",
  profilePic: "",
  token: "",
  onlineUser: [],
  socketConnection: null,
};


export const userSlice = createSlice({
  name: "user",
  initialState: initialValues,
  reducers: {
    setUser: (state, action) => {
      state.userID = action.payload.userID;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.profilePic = action.payload.profilePic;

      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...action.payload,
        })
      );
    },

    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logOut: (state) => {
      localStorage.clear("userData");
      state.userID = "";
      state.userName = "";
      state.email = "";
      state.profielPic = "";
      state.token = "";
      state.socketConnection = null;
    },
    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
    },
    setSocketConnection: (state, action) => {
      state.socketConnection = action.payload;
    },
  },
});

export const { setUser, setToken, logOut, setOnlineUser, setSocketConnection } =
  userSlice.actions;
export default userSlice.reducer;
