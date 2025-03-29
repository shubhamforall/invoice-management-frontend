import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../redux/slices/customerSlice";
import { fetchVehicles } from "../../redux/slices/vehicleSlice";
import { fetchInvoices } from "../../redux/slices/invoiceSlice";
import { fetchPayments } from "../../redux/slices/paymentSlice";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import { FaUsers, FaTruck, FaFileInvoiceDollar, FaMoneyBill } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, LineType } from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { total: totalCustomers, loading: customersLoading } = useSelector((state) => state.customers);
  const { total: totalVehicles, loading: vehiclesLoading } = useSelector((state) => state.vehicles);
  const { paid, unpaid, loading: invoicesLoading } = useSelector((state) => state.invoices);
  const { received, due, loading: paymentsLoading } = useSelector((state) => state.payments);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchVehicles());
    dispatch(fetchInvoices());
    dispatch(fetchPayments());
  }, [dispatch]);

  if (customersLoading || vehiclesLoading || invoicesLoading || paymentsLoading) {
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
    { name: "Mobile", value: 10 },
    { name: "Tablet", value: 20 },
    { name: "Desktop", value: 70 },
  ];

  const COLORS = ["#6366F1", "#38BDF8", "#10B981"];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: "Total Customers", value: totalCustomers, icon: <FaUsers /> },
              { title: "Total Vehicles", value: totalVehicles, icon: <FaTruck /> },
              { title: "Paid Invoices", value: unpaid, icon: <FaFileInvoiceDollar /> },
              { title: "Unpaid Invoices", value: paid, icon: <FaFileInvoiceDollar /> },
            ].map((item, index) => (
              <div key={index} className="bg-white shadow-md p-4 rounded-lg flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
                <div className="text-primary text-4xl">{item.icon}</div>
              </div>
            ))}
          </div>

          {/* Payment Summary */}
          <div className="flex justify-between items-center bg-white shadow-md p-6 mt-6 rounded-lg">
            <div className="w-1/2 text-center border-r">
              <h3 className="text-lg font-semibold">Total Payment Received</h3>
              <p className="text-3xl font-bold text-green-600">${received}</p>
            </div>
            <div className="w-1/2 text-center">
              <h3 className="text-lg font-semibold">Total Payment Due</h3>
              <p className="text-3xl font-bold text-red-600">${due}</p>
            </div>
          </div>

          {/* Graph & Pie Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Line Graph */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Payments Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={paymentData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Line type="monotone" dataKey="received" stroke="#6366F1" strokeWidth={2} />
                  <Line type="monotone" dataKey="due" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Used Devices</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center mt-4 space-x-4">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                    <p>{entry.name} - {entry.value}%</p>
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
