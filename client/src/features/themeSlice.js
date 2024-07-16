import { createSlice } from "@reduxjs/toolkit";
export const themeSlice = createSlice({
  name: "themeSlice",
  initialState: localStorage.getItem("theme") || "dark",
  reducers: {
    toggleTheme: (state) => {
      state = state === "dark" ? "light" : "dark";
      localStorage.setItem("theme", state);
      return state;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
