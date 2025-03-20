import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices } from "../../redux/slices/invoiceSlice";
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

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.Customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.Customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.includes(searchTerm)
  );

  const handleDownload = async (invoiceId) => {
    try {
      const response = await API.get(`/invoice/download/${invoiceId}`, {
        responseType: 'blob', 
      });
  
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <div className="p-6 bg-white rounded shadow mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Invoices</h2>
            <button onClick={() => navigate("/invoices/add")} className="px-4 py-2 bg-blue-600 text-white rounded">
              + Add Invoice
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400"/>
              <input
                type="text"
                placeholder="Search Invoice"
                className="pl-10 p-2 border w-full rounded"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Invoice #</th>
                <th className="p-2 border">Customer</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="text-center p-4">Loading...</td></tr>
              ) : (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border">
                    <td className="p-2 border">{invoice.id}</td>
                    <td className="p-2 border">{invoice.Customer ? `${invoice.Customer.firstName} ${invoice.Customer.lastName}` : "N/A"}</td>
                    <td className="p-2 border">₹{invoice.total}</td>
                    <td className="p-2 border">{invoice.date}</td>
                    <td className="p-2 border">{invoice.status}</td>
                    <td className="p-2 border">
                      <button onClick={() => handleDownload(invoice.id)} className="px-3 py-1 bg-green-500 text-white rounded">
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
