import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice.jsx";
import contactReducer from "../features/contactSlice.jsx";

export const store = configureStore({
  reducer: {
    user: userReducer,
    contact: contactReducer,
  },
});
