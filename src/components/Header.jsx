import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authService";
import {
  alertError,
  alertSuccess,
  logOutConfirmation,
} from "../libs/notification";

export default function Header() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const result = await logOutConfirmation();
      if (result.isConfirmed) {
        logoutUser();
        navigate("/login");
        alertSuccess("Logged out successfully");
      }
    } catch (error) {
      alertError("An error occurred while logging out");
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white mb-4 overflow-hidden shadow-md h-16">
      <div className="flex items-center justify-between px-4 max-w-[1280px] h-full m-auto">
        <div className="flex items-center">
          <h1 className="text-xl uppercase tracking-wider cursor-pointer font-bold text-teal-500">
            Document
          </h1>
        </div>
        <div
          className="hidden lg:flex lg:gap-8 gap-6 capitalize tracking-wider cursor-pointer text-lg items-center"
          id="navItems"
        >
          <Link to={"/"} className="text-teal-500">
            Documents
          </Link>
          <Link to={"/users"} className="text-teal-500">
            Users
          </Link>
          <Link to={"/profile"} className="text-teal-500">
            Profile
          </Link>
          <button onClick={handleLogout} className="text-teal-500 ">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
