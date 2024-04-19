// import { useState, useEffect } from "react";
// import { RiMenuLine, RiCloseLine } from "react-icons/ri";
// import { Link } from "react-router-dom";
// import DropdownMenu from "./DropdownMenu";

// export default function Header() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     function handleResize() {
//       setIsMobile(window.innerWidth < 541);
//     }

//     handleResize();

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <div>
//       <nav
//         className={`bg-white mb-4 ${
//           isMobile ? "h-fit " : "h-16"
//         } overflow-hidden shadow-md`}
//       >
//         <div
//           className={`${
//             isMobile ? "py-4" : "lg:px-8 px-4 max-w-[1280px] h-full m-auto"
//           } flex items-center justify-between`}
//         >
//           <div className="flex items-center">
//             <h1 className="lg:text-2xl text-xl uppercase tracking-wider cursor-pointer font-bold text-teal-500">
//               Document
//             </h1>
//           </div>
//           {isMobile ? (
//             <div
//               className="flex items-center text-xl"
//               onClick={toggleMobileMenu}
//             >
//               {isMobileMenuOpen ? <RiCloseLine /> : <RiMenuLine />}
//             </div>
//           ) : (
//             <div
//               className="hidden lg:flex lg:gap-8 gap-6 capitalize tracking-wider cursor-pointer text-lg items-center"
//               id="navItems"
//             >
//               <Link to={"/"} className="text-teal-500">
//                 Documents
//               </Link>
//               <span className="text-teal-500">Users</span>
//               <div className="relative" x-data="{ open: false }">
//                 <button
//                   onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                   type="button"
//                   className="text-teal-500 group p-4 inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900"
//                   aria-expanded="false"
//                 >
//                   <span>Profile</span>

//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>
//       {isMobile && (
//         <div
//           className={`fixed flex flex-col gap-8 pt-16 px-4 text-xl uppercase bg-white h-full inset-0 top-16 w-[70%] left-[-70%] ease-in-out duration-500 cursor-pointer ${
//             isMobileMenuOpen ? "left-0" : ""
//           }`}
//         >
//           <span className="text-teal-500">Documents</span>
//           <span className="text-teal-500">Utilisateurs</span>
//           <span className="text-teal-500">Profil</span>
//           <DropdownMenu />
//         </div>
//       )}
//     </div>
//   );
// }

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
