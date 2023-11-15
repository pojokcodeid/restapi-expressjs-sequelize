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

export const addKontak = createAsyncThunk("contact/addKontak", async (data) => {
  try {
    await RefreshToken();
    const response = await axios.post("/api/contacts", data, {
      headers: {
        Authorization: `Bearer ${secureLocalStorage.getItem("acessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    const data = JSON.parse(error.request.response);
    throw new Error(data.errors[0] ? data.errors[0] : error.message);
  }
});

export const detailKontak = createAsyncThunk(
  "contact/detailKontak",
  async (data) => {
    return data;
  }
);

export const deleteKontak = createAsyncThunk(
  "contact/deleteKontak",
  async (id) => {
    try {
      await RefreshToken();
      const response = await axios.delete(`/api/contacts/${id}`, {
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

export const updateKontak = createAsyncThunk(
  "contact/updateKontak",
  async (data) => {
    try {
      await RefreshToken();
      const response = await axios.put(
        `/api/contacts/${data.contactId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${secureLocalStorage.getItem("acessToken")}`,
          },
        }
      );
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
    dataAdd: null,
    errorAdd: null,

    dataVal: null,
    dataUpdate: null,
    errorEdit: null,
    dataDelete: null,
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
      })

      // add kontak
      .addCase(addKontak.pending, (state) => {
        state.loading = true;
        state.errorAdd = null;
      })
      .addCase(addKontak.fulfilled, (state, action) => {
        state.dataAdd = action.payload;
        state.loading = false;
        state.errorAdd = null;
      })
      .addCase(addKontak.rejected, (state, action) => {
        state.loading = false;
        state.errorAdd = action.error.message;
        state.dataAdd = null;
      })

      // detail kontak
      .addCase(detailKontak.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.dataAdd = null;
        state.dataUpdate = null;
      })
      .addCase(detailKontak.fulfilled, (state, action) => {
        state.dataVal = action.payload;
        state.loading = false;
        state.dataAdd = null;
        state.dataUpdate = null;
      })

      // delete kontak
      .addCase(deleteKontak.pending, (state) => {
        state.loading = true;
        state.dataDelete = null;
      })
      .addCase(deleteKontak.fulfilled, (state, action) => {
        state.dataDelete = action.payload;
        state.loading = false;
      })
      .addCase(deleteKontak.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // update kontak
      .addCase(updateKontak.pending, (state) => {
        state.loading = true;
        state.errorEdit = null;
      })
      .addCase(updateKontak.fulfilled, (state, action) => {
        state.loading = false;
        state.errorEdit = null;
        state.dataUpdate = action.payload;
      })
      .addCase(updateKontak.rejected, (state, action) => {
        state.loading = false;
        state.errorEdit = action.error.message;
        state.dataUpdate = null;
      });
  },
});

export default contackSlice.reducer;
