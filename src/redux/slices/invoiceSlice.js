import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axiosInstance";

// Fetch all invoices
export const fetchInvoices = createAsyncThunk("invoices/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/invoice");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch invoices");
  }
});

// Create a new invoice
export const createInvoice = createAsyncThunk("invoices/create", async (invoiceData, { rejectWithValue }) => {
  try {
    const response = await API.post("/invoice", invoiceData);
    return response.data; // Response contains success message and invoice data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to create invoice");
  }
});

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
    loading: false,
    error: null,
    successMessage: "", // ✅ Added success message state
  },
  reducers: {
    clearMessages: (state) => {
      state.successMessage = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Invoices
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Invoice
      .addCase(createInvoice.pending, (state) => {
        state.loading = true;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message; 
        state.invoices.push(action.payload.invoice);
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = invoiceSlice.actions;
export default invoiceSlice.reducer;
