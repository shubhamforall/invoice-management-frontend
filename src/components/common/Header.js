import { FaBell } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-white flex justify-between p-4 shadow-md">
      <h2 className="text-xl font-semibold">Vishal Transportations</h2>
      <div className="flex items-center">
        <FaBell className="mr-4 text-gray-600"/>
        <span className="font-semibold">Ankit Sharma (Admin)</span>
        <button className="ml-4 bg-red-600 px-4 py-2 text-white rounded">Logout</button>
      </div>
    </div>
  );
};

export default Header;
