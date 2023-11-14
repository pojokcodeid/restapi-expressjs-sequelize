import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RefreshToken from "../auth/RefreshToken.jsx";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

export const getContactList = createAsyncThunk(
  "contact/getContactList",
  async () => {
    try {
      await RefreshToken();
      const response = await axios.get("/api/contacts", {
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem("acessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      const data = JSON.parse(error.request.response);
      throw new Error(data.errors[0] ? data.errors[0] : error.message);
    }
  }
);

const contackSlice = createSlice({
  name: "contact",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContactList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContactList.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(getContactList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default contackSlice.reducer;
