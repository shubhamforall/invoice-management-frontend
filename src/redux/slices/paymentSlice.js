import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axiosInstance";

// Fetch all payments
export const fetchPayments = createAsyncThunk("payments/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/payments");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch payments");
  }
});

const paymentSlice = createSlice({
  name: "payments",
  initialState: { payments: [], received: 0, due: 0, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
        state.received = action.payload.reduce((acc, payment) => acc + payment.received, 0);
        state.due = action.payload.reduce((acc, payment) => acc + payment.due, 0);
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
