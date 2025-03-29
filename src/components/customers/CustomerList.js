import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../redux/slices/customerSlice";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import { FaSearch} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customers, loading } = useSelector((state) => state.customers);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const filteredCustomers = customers.filter((customer) =>
    customer.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ">
        <Header />
        <div className="p-4 mx-6 my-10 bg-white rounded shadow mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Customers</h2>
            <button
              onClick={() => navigate("/customers/add")}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              + Add Customer
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 p-2 border  align-middle w-full rounded"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border text-center align-middle">ID</th>
                <th className="p-2 border text-center align-middle">
                  First Name
                </th>
                <th className="p-2 border text-center align-middle">
                  Last Name
                </th>
                <th className="p-2 border text-center align-middle">
                  Mobile No
                </th>
                <th className="p-2 border text-center align-middle">Email</th>
                <th className="p-2 border text-center align-middle">Address</th>
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
                filteredCustomers.map((customer, index) => (
                  <tr key={index} className="border">
                    <td className="p-2 border text-center align-middle text-indigo-700 font-mono tracking-wide">
                      CN:{customer.id.slice(-6).toUpperCase()}
                    </td>
                    <td className="p-2 border text-center align-middle">
                      {customer.firstName}
                    </td>
                    <td className="p-2 border text-center align-middle">
                      {customer.lastName}
                    </td>
                    <td className="p-2 border text-center align-middle">
                      {customer.mobileNo}
                    </td>
                    <td className="p-2 border text-center align-middle">
                      {customer.email}
                    </td>
                    <td className="p-2 border text-center align-middle">
                      {customer.address}
                    </td>
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

export default CustomerList;
