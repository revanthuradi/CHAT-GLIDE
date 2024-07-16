import { configureStore } from "@reduxjs/toolkit";
import themeSliceReducer from "../features/themeSlice.js";
import userSliceReducer from "../features/user.js";

export const store = configureStore({
  reducer: {
    darkMode: themeSliceReducer,
    user : userSliceReducer
  },
});
