import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicles } from "../../redux/slices/vehicleSlice";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VehicleList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { vehicles, loading } = useSelector((state) => state.vehicles);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <div className="p-6 bg-white rounded shadow mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Vehicles</h2>
            <button
              onClick={() => navigate("/vehicles/add")}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              + Add Vehicle
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 p-2 border text-center align-middle w-full rounded"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border text-center align-middle">ID</th>
                <th className="p-2 border text-center align-middle">Name</th>
                <th className="p-2 border text-center align-middle">Number</th>
                <th className="p-2 border text-center align-middle">Type</th>
                <th className="p-2 border text-center align-middle">Model Year</th>
                <th className="p-2 border text-center align-middle">Colour</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : (
                filteredVehicles.map((vehicle, index) => (
                  <tr key={index} className="border">
                    <td className="p-2 border text-center align-middle text-indigo-700 font-mono tracking-wide">
                      VN:{vehicle.id.slice(-6).toUpperCase()}
                    </td>
                    <td className="p-2 border text-center align-middle">{vehicle.name}</td>
                    <td className="p-2 border text-center align-middle">{vehicle.number}</td>
                    <td className="p-2 border text-center align-middle">{vehicle.type}</td>
                    <td className="p-2 border text-center align-middle">{vehicle.modelYear}</td>
                    <td className="p-2 border text-center align-middle">{vehicle.colour}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VehicleList;
