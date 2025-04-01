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
  const [generalError, setGeneralError] = useState("");

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile number is required";
    } else if (!formData.mobileNo.match(/^[0-9]{10}$/)) {
      newErrors.mobileNo = "Mobile number must be 10 digits";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear specific error when user starts typing
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });

    // Clear general backend error when user starts typing
    setGeneralError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await dispatch(addCustomer(formData)).unwrap(); 
      navigate("/customers");
    } catch (error) {
      console.error("Error adding customer:", error);

      let newErrors = {};
      if (error.error && error.error.errors && Array.isArray(error.error.errors)) {
        error.error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message.replace(/^./, (char) => char.toUpperCase());
          }
        });
      }
       else if (error.message) {
        setGeneralError(error.message); 
      }

      setErrors(newErrors);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Header />
        <div className="p-4 mx-6 my-10 bg-white rounded shadow mt-4">
          <h2 className="text-xl font-semibold mb-4">Add Customer</h2>

          {/* General Backend Error Message */}
          {generalError && <p className="text-red-500 mb-4">{generalError}</p>}

          <form onSubmit={handleSubmit} className="w-full">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block font-medium mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border border-gray-300 focus:border-blue-500 focus:outline-none text-sm px-3 py-2 rounded w-full"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border border-gray-300 focus:border-blue-500 focus:outline-none text-sm px-3 py-2 rounded w-full"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>

            {/* Mobile No & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block font-medium mb-1">
                  Mobile No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="mobileNo"
                  placeholder="Enter mobile number"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className="border border-gray-300 focus:border-blue-500 focus:outline-none text-sm px-3 py-2 rounded w-full"
                />
                {errors.mobileNo && <p className="text-red-500 text-sm">{errors.mobileNo}</p>}
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 focus:border-blue-500 focus:outline-none text-sm px-3 py-2 rounded w-full"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>

            {/* Address */}
            <div className="mb-6">
              <label className="block font-medium mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                className="border border-gray-300 focus:border-blue-500 focus:outline-none text-sm px-3 py-2 rounded w-full"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
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
                className="px-6 py-2 bg-primary text-white rounded"
                disabled={Object.keys(errors).length > 0}
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
