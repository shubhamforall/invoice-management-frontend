import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInvoices,
  updateInvoiceStatus,
} from "../../redux/slices/invoiceSlice";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import { FaSearch, FaFileDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../../utils/axiosInstance";

const InvoiceList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { invoices, loading } = useSelector((state) => state.invoices);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const filteredInvoices = invoices.filter((invoice) => {
    const customerFirst = invoice.Customer?.firstName?.toLowerCase() || "";
    const customerLast = invoice.Customer?.lastName?.toLowerCase() || "";
    const invoiceId = invoice.id || "";

    return (
      customerFirst.includes(searchTerm.toLowerCase()) ||
      customerLast.includes(searchTerm.toLowerCase()) ||
      invoiceId.includes(searchTerm)
    );
  });

  const handleStatusChange = (invoiceId, newStatus) => {
    dispatch(updateInvoiceStatus({ invoiceId, status: newStatus }));
  };

  const handleDownload = async (invoiceId) => {
    try {
      const response = await API.get(`/invoice/download/${invoiceId}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${invoiceId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download invoice.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4 mx-6 my-10 bg-white rounded shadow mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Invoices</h2>
            <button
              onClick={() => navigate("/invoices/add")}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              + Add Invoice
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search Invoice"
                className="pl-10 p-2 border align-middle w-full rounded"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border text-center align-middle">
                  Invoice #
                </th>
                <th className="p-2 border text-center align-middle">
                  Customer
                </th>
                <th className="p-2 border text-center align-middle">Amount</th>
                <th className="p-2 border text-center align-middle">Date</th>
                <th className="p-2 border text-center align-middle">Status</th>
                <th className="p-2 border text-center align-middle">Action</th>
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
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border">
                    <td className="p-2 border text-center align-middle text-indigo-700 font-mono tracking-wide">
                      IN:{invoice.id.slice(-6).toUpperCase()}
                    </td>
                    <td className="p-2 border text-center align-middle">
                      {invoice.Customer
                        ? `${invoice.Customer.firstName} ${invoice.Customer.lastName}`
                        : "Loading..."}
                    </td>
                    <td className="p-2 border text-center align-middle">
                      ₹{invoice.total}
                    </td>
                    <td className="p-2 border text-center align-middle">
                      {invoice.date}
                    </td>
                    <td className="p-2 border text-center align-middle">
                      <select
                        value={invoice.status}
                        onChange={(e) =>
                          handleStatusChange(invoice.id, e.target.value)
                        }
                        className={`px-2 py-1 rounded font-medium cursor-pointer 
                        ${invoice.status === "Paid" ? "text-green-600" : "text-red-600"}`}
                      >
                        <option value="Paid" className="text-black">
                          Paid
                        </option>
                        <option value="Unpaid" className="text-black">
                          Unpaid
                        </option>
                      </select>
                    </td>

                    <td className="p-2 border text-center align-middle">
                      <button
                        onClick={() => handleDownload(invoice.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded"
                      >
                        <FaFileDownload />
                      </button>
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

export default InvoiceList;
