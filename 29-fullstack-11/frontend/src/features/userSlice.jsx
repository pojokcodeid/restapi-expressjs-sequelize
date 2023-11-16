import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../auth/AxiosConfig.jsx";
import secureLocalStorage from "react-secure-storage";
// import RefreshToken from "../auth/RefreshToken.jsx";

export const setLoginUser = createAsyncThunk(
  "user/setLoginUser",
  async (data) => {
    try {
      const response = await axios.post("/api/users/login", data);
      return response.data;
    } catch (error) {
      const dta = JSON.parse(error.request.response);
      throw new Error(dta.errors[0] ? dta.errors[0] : error.message);
    }
  }
);

export const setRegisterUser = createAsyncThunk(
  "user/setRegisterUser",
  async (data) => {
    try {
      const response = await axios.post("/api/users", data);
      return response.data;
    } catch (error) {
      const dta = JSON.parse(error.request.response);
      throw new Error(dta.errors[0] ? dta.errors[0] : error.message);
    }
  }
);

export const setForgotPassword = createAsyncThunk(
  "user/setForgotPassword",
  async (data) => {
    try {
      const response = await axios.post("/api/users/forgot-password", data);
      return response.data;
    } catch (error) {
      const dta = JSON.parse(error.request.response);
      throw new Error(dta.errors[0] ? dta.errors[0] : error.message);
    }
  }
);

export const setProfile = createAsyncThunk("user/setProfile", async (data) => {
  try {
    // await RefreshToken();
    const newData = {};
    newData.name = data.name;
    newData.email = data.email;
    if (data.password !== "") {
      newData.password = data.password;
      newData.confirmPassword = data.confirmPassword;
    }
    const response = await axios.patch("/api/users/" + data.userId, newData, {
      headers: {
        Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
      },
    });
    return response.data;
  } catch (error) {
    const dta = JSON.parse(error.request.response);
    throw new Error(dta.errors[0] ? dta.errors[0] : error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login process
      .addCase(setLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setLoginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(setLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // process register
      .addCase(setRegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setRegisterUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(setRegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // process forgot password
      .addCase(setForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setForgotPassword.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(setForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // process profile
      .addCase(setProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(setProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
