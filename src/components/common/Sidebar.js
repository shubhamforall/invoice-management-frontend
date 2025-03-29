import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  FaTachometerAlt,
  FaUsers,
  FaTruck,
  FaFileInvoiceDollar,
  FaMoneyBill,
  FaCog,
} from "react-icons/fa";
import logo from "../../assets/logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Function to check if the current route is active (including subroutes)
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="flex">
      {/* Hamburger Button - Visible only on mobile */}
      <button
        className="p-2 m-2 text-white bg-primary rounded md:hidden"
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
        {/* Logo */}
        <div className="p-4">
          <img
            src={logo}
            alt="Vishal Transportation Logo"
            className="w-20 h-20 rounded-full mx-auto"
          />
        </div>

        {/* Navigation */}
        <nav>
          <ul>
            {[
              { to: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
              { to: "/customers", icon: <FaUsers />, label: "Customers" },
              { to: "/vehicles", icon: <FaTruck />, label: "Vehicles" },
              { to: "/invoices", icon: <FaFileInvoiceDollar />, label: "Invoices" },
              { to: "/payments", icon: <FaMoneyBill />, label: "Payments" },
              { to: "/settings", icon: <FaCog />, label: "Settings" },
            ].map((item) => (
              <li key={item.to} className="px-4 py-1">
                <Link
                  to={item.to}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.to)
                      ? "bg-activeNavigationMenu text-white shadow-md"
                      : "hover:bg-NavigationMenuHover hover:text-white"
                  }`}
                >
                  <span className="mr-4 text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
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
