import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 
import { FaUsers, FaTruck, FaFileInvoiceDollar, FaMoneyBill, FaCog } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Hamburger Button - Visible only on mobile */}
      <button
        className="p-2 m-2 text-white bg-blue-600 rounded md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <h2 className="text-xl font-bold p-4">VISHAL TRANSPORTATION</h2>
        <nav className="mt-4">
          <ul>
            <li className="p-4 hover:bg-blue-700">
              <Link to="/customers"><FaUsers className="inline mr-2"/>Customers</Link>
            </li>
            <li className="p-4 hover:bg-blue-700">
              <Link to="/vehicles"><FaTruck className="inline mr-2"/>Vehicles</Link>
            </li>
            <li className="p-4 hover:bg-blue-700">
              <Link to="/invoices"><FaFileInvoiceDollar className="inline mr-2"/>Invoices</Link>
            </li>
            <li className="p-4 hover:bg-blue-700">
              <Link to="/payments"><FaMoneyBill className="inline mr-2"/>Payments</Link>
            </li>
            <li className="p-4 hover:bg-blue-700">
              <Link to="/settings"><FaCog className="inline mr-2"/>Settings</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
