import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axiosInstance";

// Fetch vehicles
export const fetchVehicles = createAsyncThunk("vehicles/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/vehicle");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Add vehicle
export const addVehicle = createAsyncThunk("vehicles/add", async (vehicleData, { rejectWithValue }) => {
  try {
    const response = await API.post("/vehicle", vehicleData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState: { vehicles: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addVehicle.fulfilled, (state, action) => {
        state.vehicles.push(action.payload);
      });
  },
});

export default vehicleSlice.reducer;
