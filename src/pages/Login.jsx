import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authService";
import { alertError, alertSuccess } from "../libs/notification";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isLoading } = useMutation(loginUser, {
    onSuccess: () => {
      alertSuccess("Login successful!");
      navigate("/");
    },
    onError: (error) => {
      alertError(`Login failed: ${error.message}`);
    },
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(loginData);
  };

  return (
    <div className="font-sans text-gray-900 antialiased min-h-screen flex flex-col shadow-2xl border justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="py-8">
            <center>
              <span className="text-2xl font-semibold">Log In</span>
            </center>
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
              value={loginData.username}
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
                value={loginData.password}
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

          <div className="flex items-center justify-between mt-4">
            <Link
              to="/register"
              className="text-blue-600 font-semibold text-lg underline hover:no-underline"
            >
              Sign Up
            </Link>
            <button
              type="submit"
              className="ms-4 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
              {isLoading ? "Logging In..." : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
