import { useState } from "react";
import { useDispatch } from "react-redux";
import { addVehicle } from "../../redux/slices/vehicleSlice";
import { useNavigate } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";

const VehicleForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    type: "",
    modelYear: "",
    colour: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vehicle name is required";
    if (!formData.number.match(/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/))
      newErrors.number = "Enter a valid vehicle number (e.g., MH12AB1234)";
    if (!formData.type.trim()) newErrors.type = "Vehicle type is required";
    const currentYear = new Date().getFullYear();
    if (!formData.modelYear || formData.modelYear < 1900 || formData.modelYear > currentYear)
      newErrors.modelYear = `Model year must be between 1900 and ${currentYear}`;
    if (!formData.colour.trim()) newErrors.colour = "Colour is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(addVehicle(formData));
      navigate("/vehicles");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <div className="p-6 bg-white rounded shadow mt-4">
          <h2 className="text-2xl font-bold mb-4">Add Vehicle</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Vehicle Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter vehicle name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Vehicle Number</label>
              <input
                type="text"
                name="number"
                placeholder="Enter vehicle number"
                value={formData.number}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Type</label>
              <input
                type="text"
                name="type"
                placeholder="Enter type (SUV, Sedan, etc.)"
                value={formData.type}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Model Year</label>
              <input
                type="number"
                name="modelYear"
                placeholder="Enter model year"
                value={formData.modelYear}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              {errors.modelYear && <p className="text-red-500 text-sm">{errors.modelYear}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Colour</label>
              <input
                type="text"
                name="colour"
                placeholder="Enter colour"
                value={formData.colour}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              {errors.colour && <p className="text-red-500 text-sm">{errors.colour}</p>}
            </div>

            <div className="col-span-2 flex justify-between">
              <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => navigate("/vehicles")}>
                Back
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={Object.keys(errors).length > 0}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleForm;
