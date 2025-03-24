import { FaBell } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="bg-white flex justify-between p-4 shadow-md">
      <h2 className="text-xl font-semibold">Vishal Transportations</h2>
      <div className="flex items-center">
        <FaBell className="mr-4 text-gray-600" />
        <span className="font-semibold mr-4">
          {user ? user.email : "Guest"}
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
