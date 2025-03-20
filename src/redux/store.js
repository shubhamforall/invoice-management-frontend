import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import customerReducer from "./slices/customerSlice";
import vehicleReducer from "./slices/vehicleSlice";
import invoiceReducer from "./slices/invoiceSlice";
import paymentReducer from "./slices/paymentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    vehicles: vehicleReducer,
    invoices: invoiceReducer,
    payments: paymentReducer,
  },
});

export default store;
