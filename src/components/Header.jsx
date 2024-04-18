import { useState, useEffect } from "react";
import docImage from "../assets/doc.jpg";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 541);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <nav
        className={`bg-white mb-4 ${
          isMobile ? "h-fit " : "h-16"
        } overflow-hidden shadow-md`}
      >
        <div
          className={`${
            isMobile ? "py-4" : "lg:px-8 px-4 max-w-[1280px] h-full m-auto"
          } flex items-center justify-between`}
        >
          <div className="flex items-center">
            <img
              src={docImage}
              alt="Document Image"
              className="w-12 h-12 mr-2"
            />
            <h1 className="lg:text-2xl text-xl uppercase tracking-wider cursor-pointer font-bold text-teal-500">
              Document
            </h1>
          </div>
          {isMobile ? (
            <div
              className="flex items-center text-xl"
              onClick={toggleMobileMenu}
            >
              <i
                className={`fa ${isMobileMenuOpen ? "fa-close" : "fa-bars"}`}
              ></i>
            </div>
          ) : (
            <div
              className="hidden lg:flex lg:gap-8 gap-6 capitalize tracking-wider cursor-pointer text-lg items-center"
              id="navItems"
            >
              <Link to={"/"} className="text-teal-500">
                Documents
              </Link>
              <span className="text-teal-500">Users</span>
              <span className="text-teal-500">profile</span>
            </div>
          )}
        </div>
      </nav>
      {isMobile && (
        <div
          className={`fixed flex flex-col gap-8 pt-16 px-4 text-xl uppercase bg-white h-full inset-0 top-16 w-[70%] left-[-70%] ease-in-out duration-500 cursor-pointer ${
            isMobileMenuOpen ? "left-0" : ""
          }`}
        >
          <span className="text-teal-500">Documents</span>
          <span className="text-teal-500">Utilisateurs</span>
          <span className="text-teal-500">Profil</span>
        </div>
      )}
    </div>
  );
}
