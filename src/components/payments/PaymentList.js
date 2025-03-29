import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayments } from "../../redux/slices/paymentSlice";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import { FaSearch } from "react-icons/fa";

const PaymentList = () => {
  const dispatch = useDispatch();
  const { payments, loading } = useSelector((state) => state.payments);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const filteredPayments = payments.filter((payment) =>
    payment.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4 mx-6 my-10 bg-white rounded shadow mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Payments</h2>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400"/>
              <input
                type="text"
                placeholder="Search Payments"
                className="pl-10 p-2 border align-middle w-full rounded"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border text-center align-middle">Customer</th>
                <th className="p-2 border text-center align-middle">Total Invoiced (₹)</th>
                <th className="p-2 border text-center align-middle">Total Received (₹)</th>
                <th className="p-2 border text-center align-middle">Pending Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center p-4">Loading...</td></tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.customerId} className="border">
                    <td className="p-2 border text-center align-middle">{payment.customerName}</td>
                    <td className="p-2 border text-center align-middle">₹{payment.totalInvoiced.toLocaleString()}</td>
                    <td className="p-2 border text-center align-middle text-green-600">₹{payment.totalReceived.toLocaleString()}</td>
                    <td className="p-2 border text-center align-middle text-red-500">₹{payment.pendingAmount.toLocaleString()}</td>
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

export default PaymentList;
