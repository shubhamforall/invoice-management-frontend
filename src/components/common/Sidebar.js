import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  FaUsers,
  FaTruck,
  FaFileInvoiceDollar,
  FaMoneyBill,
  FaCog,
} from "react-icons/fa";
import logo from "../../assets/logo.png";

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
        className={`fixed top-0 left-0 h-full w-48 bg-primary text-NavigationMenu transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="p-4">
          <img
            src={logo}
            alt="Vishal Transportation Logo"
            className="w-20 h-20 rounded-full"
          />
        </div>

        <nav className="">
          <ul>
            <li className="p-4 hover:bg-NavigationMenuHover hover:text-white">
              <Link to="/customers">
                <FaUsers className="inline mr-4 text-lg" />
                Customers
              </Link>
            </li>
            <li className="p-4 hover:bg-NavigationMenuHover hover:text-white">
              <Link to="/vehicles">
                <FaTruck className="inline mr-4 text-lg" />
                Vehicles
              </Link>
            </li>
            <li className="p-4 hover:bg-NavigationMenuHover hover:text-white">
              <Link to="/invoices">
                <FaFileInvoiceDollar className="inline mr-4 text-lg" />
                Invoices
              </Link>
            </li>
            <li className="p-4 hover:bg-NavigationMenuHover hover:text-white">
              <Link to="/payments">
                <FaMoneyBill className="inline mr-4 text-lg" />
                Payments
              </Link>
            </li>
            <li className="p-4 hover:bg-NavigationMenuHover hover:text-white">
              <Link to="/settings">
                <FaCog className="inline mr-4 text-lg" />
                Settings
              </Link>
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
