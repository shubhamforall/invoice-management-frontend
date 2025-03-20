import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axiosInstance"; // Import the custom Axios instance

// Fetch Customers
export const fetchCustomers = createAsyncThunk("customers/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/customer");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch customers");
  }
});

// Add Customer
export const addCustomer = createAsyncThunk("customers/add", async (customerData, { rejectWithValue }) => {
  try {
    const response = await API.post("/customer", customerData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to add customer");
  }
});

const customerSlice = createSlice({
  name: "customers",
  initialState: { customers: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle addCustomer
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers.push(action.payload);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default customerSlice.reducer;
