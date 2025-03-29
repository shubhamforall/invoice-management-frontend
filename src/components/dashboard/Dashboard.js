import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../redux/slices/customerSlice";
import { fetchVehicles } from "../../redux/slices/vehicleSlice";
import { fetchInvoices } from "../../redux/slices/invoiceSlice";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import { FaUsers, FaTruck, FaFileInvoice, FaRupeeSign } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { total: totalCustomers, loading: customersLoading } = useSelector(
    (state) => state.customers
  );
  const { total: totalVehicles, loading: vehiclesLoading } = useSelector(
    (state) => state.vehicles
  );
  const {
    totalPaid,
    totalUnpaid,
    paidCount,
    unpaidCount,
    loading: invoicesLoading,
  } = useSelector((state) => state.invoices);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchVehicles());
    dispatch(fetchInvoices());
  }, [dispatch]);

  if (customersLoading || vehiclesLoading || invoicesLoading) {
    return <p className="text-center text-lg">Loading dashboard...</p>;
  }

  const paymentData = [
    { month: "Jan", received: 5000, due: 2000 },
    { month: "Feb", received: 7000, due: 2500 },
    { month: "Mar", received: 8000, due: 3000 },
    { month: "Apr", received: 6000, due: 3500 },
    { month: "May", received: 9000, due: 4000 },
    { month: "Jun", received: 11000, due: 5000 },
  ];

  const pieData = [
    { name: "Paid Invoices", value: paidCount },
    { name: "Unpaid Invoices", value: unpaidCount },
  ];

  const COLORS = ["#10B981", "#EF4444"];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                title: "Total Customers",
                value: totalCustomers,
                icon: <FaUsers />,
                bg: "bg-blue-500",
              },
              {
                title: "Total Vehicles",
                value: totalVehicles,
                icon: <FaTruck />,
                bg: "bg-purple-500",
              },
              {
                title: "Paid Invoices",
                value: paidCount,
                icon: <FaFileInvoice />,
                bg: "bg-green-500",
              },
              {
                title: "Unpaid Invoices",
                value: unpaidCount,
                icon: <FaFileInvoice />,
                bg: "bg-red-500",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`${item.bg} text-white shadow-lg p-5 rounded-xl flex items-center justify-between`}
              >
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-3xl font-bold">{item.value}</p>
                </div>
                <div className="text-5xl opacity-75">{item.icon}</div>
              </div>
            ))}
          </div>

          {/* Payment Summary */}
          <div className="flex justify-between items-center bg-gradient-to-r from-green-200 to-green-100 shadow-md p-6 mt-6 rounded-xl">
            <div className="w-1/2 text-center border-r border-green-300">
              <h3 className="text-lg font-semibold text-green-700">
                Total Payment Received
              </h3>
              <p className="text-4xl font-bold text-green-700">₹{totalPaid}</p>
            </div>
            <div className="w-1/2 text-center">
              <h3 className="text-lg font-semibold text-red-700">
                Total Payment Due
              </h3>
              <p className="text-4xl font-bold text-red-700">₹{totalUnpaid}</p>
            </div>
          </div>

          {/* Graph & Pie Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Line Graph */}
            <div className="bg-white shadow-lg p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Payments Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={paymentData}>
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="received"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="due"
                    stroke="#EF4444"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white shadow-lg p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Invoice Status</h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={100} // Increased size
                    innerRadius={50} // Added inner radius for a ring effect
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={["#3B82F6", "#F59E0B"][index]}
                      /> // Blue & Orange colors
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="flex justify-center mt-4 space-x-4">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: ["#3B82F6", "#F59E0B"][index] }}
                    ></div>
                    <p className="text-gray-700 font-medium">
                      {entry.name} - {entry.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
