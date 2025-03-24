import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../redux/slices/customerSlice";
import { fetchVehicles } from "../../redux/slices/vehicleSlice";
import { createInvoice, clearMessages } from "../../redux/slices/invoiceSlice";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import { useNavigate } from "react-router-dom";

const InvoiceForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { customers } = useSelector((state) => state.customers);
  const { vehicles } = useSelector((state) => state.vehicles);
  const { successMessage, error } = useSelector((state) => state.invoices);

  const [formData, setFormData] = useState({
    customerId: "",
    vehicleId: "",
    driverName: "",
    date: "",
    loadingAddress: "",
    deliveryAddress: "",
    weight: "",
    rate: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchVehicles());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        dispatch(clearMessages());
        navigate("/invoices");
      }, 2000);
    }
  }, [successMessage, dispatch, navigate]);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.customerId) newErrors.customerId = "Customer is required";
    if (!formData.vehicleId) newErrors.vehicleId = "Vehicle is required";
    if (!formData.driverName) newErrors.driverName = "Driver name is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.loadingAddress) newErrors.loadingAddress = "Loading address is required";
    if (!formData.deliveryAddress) newErrors.deliveryAddress = "Delivery address is required";
    if (!formData.weight || isNaN(formData.weight) || formData.weight <= 0) newErrors.weight = "Valid weight is required";
    if (!formData.rate || isNaN(formData.rate) || formData.rate <= 0) newErrors.rate = "Valid rate is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(createInvoice(formData));
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <div className="p-6 bg-white rounded shadow mt-4">
          <h2 className="text-2xl font-bold mb-4">Create Invoice</h2>

          {/* ✅ Success Message */}
          {successMessage && (
            <div className="p-3 mb-4 text-green-700 bg-green-100 border border-green-400 rounded">
              {successMessage}
            </div>
          )}

          {/* ❌ Error Message */}
          {error && (
            <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Grid Layout - Two fields per row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Customer Selection */}
              <div>
                <label>Customer</label>
                <select
                  value={formData.customerId}
                  onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                  className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none text-sm px-3 py-2 rounded w-full"
                >
                  <option value="">Select Customer</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
                  ))}
                </select>
                {errors.customerId && <p className="text-red-500">{errors.customerId}</p>}
              </div>

              {/* Vehicle Selection */}
              <div>
                <label>Vehicle</label>
                <select
                  value={formData.vehicleId}
                  onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                  className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none text-sm px-3 py-2 rounded w-full"
                >
                  <option value="">Select Vehicle</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>{v.name} ({v.number})</option>
                  ))}
                </select>
                {errors.vehicleId && <p className="text-red-500">{errors.vehicleId}</p>}
              </div>

              {/* Driver Name */}
              <div>
                <label>Driver Name</label>
                <input
                  type="text"
                  placeholder="Enter driver name"
                  value={formData.driverName}
                  onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                  className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none text-sm px-3 py-2 rounded w-full"
                />
                {errors.driverName && <p className="text-red-500">{errors.driverName}</p>}
              </div>

              {/* Date */}
              <div>
                <label>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none text-sm px-3 py-2 rounded w-full"
                />
                {errors.date && <p className="text-red-500">{errors.date}</p>}
              </div>

              {/* Loading Address */}
              <div>
                <label>Loading Address</label>
                <input
                  type="text"
                  placeholder="Enter loading address"
                  value={formData.loadingAddress}
                  onChange={(e) => setFormData({ ...formData, loadingAddress: e.target.value })}
                  className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none text-sm px-3 py-2 rounded w-full"
                />
                {errors.loadingAddress && <p className="text-red-500">{errors.loadingAddress}</p>}
              </div>

              {/* Delivery Address */}
              <div>
                <label>Delivery Address</label>
                <input
                  type="text"
                  placeholder="Enter delivery address"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none text-sm px-3 py-2 rounded w-full"
                />
                {errors.deliveryAddress && <p className="text-red-500">{errors.deliveryAddress}</p>}
              </div>

              {/* Weight */}
              <div>
                <label>Weight (in tons)</label>
                <input
                  type="number"
                  placeholder="Enter weight"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none text-sm px-3 py-2 rounded w-full"
                />
                {errors.weight && <p className="text-red-500">{errors.weight}</p>}
              </div>

              {/* Rate */}
              <div>
                <label>Rate (per ton)</label>
                <input
                  type="number"
                  placeholder="Enter rate"
                  value={formData.rate}
                  onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                  className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none text-sm px-3 py-2 rounded w-full"
                />
                {errors.rate && <p className="text-red-500">{errors.rate}</p>}
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                Submit
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
