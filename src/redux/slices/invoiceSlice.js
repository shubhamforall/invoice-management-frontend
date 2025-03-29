import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axiosInstance";

// Fetch all invoices
export const fetchInvoices = createAsyncThunk(
  "invoices/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/invoice");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch invoices"
      );
    }
  }
);

// Create a new invoice
export const createInvoice = createAsyncThunk(
  "invoices/create",
  async (invoiceData, { rejectWithValue }) => {
    try {
      const response = await API.post("/invoice", invoiceData);
      return response.data; // Response contains success message and invoice data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create invoice"
      );
    }
  }
);

// Update invoice status
export const updateInvoiceStatus = createAsyncThunk(
  "invoices/updateStatus",
  async ({ invoiceId, status }, { rejectWithValue }) => {
    try {
      const properStatus =
        status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(); // 👈 sanitize to match ENUM
      const response = await API.patch(`/invoice/${invoiceId}`, {
        status: properStatus,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update invoice status"
      );
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
    loading: false,
    error: null,
    successMessage: "",
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
        state.paid = action.payload.filter((inv) => inv.status === "Paid").length;
        state.unpaid = action.payload.filter((inv) => inv.status === "Unpaid").length;
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
        if (action.payload.status === "Paid") state.paid += 1;
        else state.unpaid += 1;
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Invoice Status
      .addCase(updateInvoiceStatus.pending, (state) => {
        state.loading = true;
      })
      // Update status reducer
      .addCase(updateInvoiceStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.invoices.findIndex((inv) => inv.id === updated.id);
        if (index !== -1) {
          state.invoices[index] = updated;
        }
      })
      .addCase(updateInvoiceStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = invoiceSlice.actions;
export default invoiceSlice.reducer;
