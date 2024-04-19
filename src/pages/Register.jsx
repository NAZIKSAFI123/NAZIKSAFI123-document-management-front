import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authService";
import { alertError, alertSuccess } from "../libs/notification";

const Register = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "USER",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isLoading } = useMutation(registerUser, {
    onSuccess: () => {
      alertSuccess("Registration successful!");
      navigate("/login");
    },
    onError: (error) => {
      alertError(`Registration failed: ${error.message}`);
    },
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(newUser);
  };

  return (
    <div className="font-sans text-gray-900 antialiased min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
      <div className="w-full sm:max-w-lg px-6 py-4 bg-white shadow-lg  overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="py-8">
            <center>
              <span className="text-2xl font-semibold">Register</span>
            </center>
          </div>

          <div>
            <label
              className="block font-medium text-sm text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newUser.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              required
            />
          </div>

          <div className="mt-4">
            <label
              className="block font-medium text-sm text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              required
            />
          </div>

          <div className="mt-4">
            <label
              className="block font-medium text-sm text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={newUser.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              required
            />
          </div>

          <div className="mt-4 relative">
            <label
              className="block font-medium text-sm text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={newUser.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600"
              >
                {showPassword ? (
                  <FaRegEyeSlash className="w-6 h-6" />
                ) : (
                  <FaRegEye className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          <div className="block mt-4">
            <label htmlFor="remember_me" className="flex items-center">
              <input
                type="checkbox"
                id="remember_me"
                name="remember"
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
              />
              <span className="ms-2 text-sm text-gray-600">Remember Me</span>
            </label>
          </div>

          <div className="flex items-center justify-end mt-4">
            <button
              type="submit"
              className="ms-4 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
