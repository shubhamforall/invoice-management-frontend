import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../../redux/slices/customerSlice";
import { useNavigate } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";

const CustomerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.mobileNo.match(/^[0-9]{10}$/))
      newErrors.mobileNo = "Mobile number must be 10 digits";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Valid email is required";
    if (!formData.address) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear error on input change
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(addCustomer(formData));
    navigate("/customers");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Header />
        <div className="bg-blue-700 text-white py-4 px-6 text-lg font-semibold">
          Customer / Add Customer
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow w-full"
          >
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none text-sm px-3 py-2 rounded w-full"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none text-sm px-3 py-2 rounded w-full"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Mobile No & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block font-medium mb-1">Mobile No</label>
                <input
                  type="text"
                  name="mobileNo"
                  placeholder="Enter mobile number"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none text-sm px-3 py-2 rounded w-full"
                />
                {errors.mobileNo && (
                  <p className="text-red-500 text-sm">{errors.mobileNo}</p>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none text-sm px-3 py-2 rounded w-full"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="mb-6">
              <label className="block font-medium mb-1">Address</label>
              <textarea
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none text-sm px-3 py-2 rounded w-full"
                />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="px-6 py-2 bg-gray-300 rounded"
                onClick={() => navigate("/customers")}
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
