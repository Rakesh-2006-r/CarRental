import React, { useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();

  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { name, email, password } = formData;

      if (state === "forgot-password") {
        const { data } = await axios.post(`/api/user/forgot-password`, {
          email,
          password,
        });

        if (data.success) {
          toast.success(data.message);
          setState("login");
        } else {
          toast.error(data.message);
        }
        return;
      }

      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        navigate("/");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-[100] flex justify-center items-center text-sm text-gray-600 bg-black/50 backdrop-blur-sm"
      onClick={() => setShowLogin(false)}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="relative bg-white p-10 rounded-xl shadow-2xl w-full sm:w-96 text-center"
      >
        <img src={assets.logo} alt="logo" className="h-8 mx-auto mb-6" />
        <h1 className="text-2xl font-semibold mb-2 text-gray-800">
          {state === "login"
            ? "Login"
            : state === "register"
              ? "Sign up"
              : "Reset Password"}
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          {state === "forgot-password"
            ? "Enter your email and new password"
            : "Please sign in to continue"}
        </p>

        {state === "register" && (
          <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-light rounded-full border border-borderColor">
            <img
              src={assets.users_icon}
              alt=""
              className="w-4 h-4 opacity-50"
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full bg-transparent outline-none text-gray-700"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-light rounded-full border border-borderColor">
          <img src={assets.gmail_logo} alt="" className="w-4 h-4 opacity-50" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full bg-transparent outline-none text-gray-700"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-light rounded-full border border-borderColor">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 opacity-50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
          <input
            type="password"
            name="password"
            placeholder={
              state === "forgot-password" ? "New Password" : "Password"
            }
            className="w-full bg-transparent outline-none text-gray-700"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {state === "login" && (
          <div
            onClick={() => setState("forgot-password")}
            className="text-right text-xs text-primary cursor-pointer mb-4 hover:underline"
          >
            Forgot password?
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-full bg-primary text-white font-medium hover:bg-primary-dull transition-colors"
        >
          {state === "login"
            ? "Login"
            : state === "register"
              ? "Sign up"
              : "Reset Password"}
        </button>

        <p className="text-gray-500 text-xs mt-4">
          {state === "login"
            ? "Don't have an account?"
            : state === "register"
              ? "Already have an account?"
              : "Remember your password?"}
          <span
            onClick={() =>
              setState((prev) => (prev === "login" ? "register" : "login"))
            }
            className="text-primary font-medium hover:underline ml-1 cursor-pointer"
          >
            {state === "login"
              ? "Click here"
              : state === "register"
                ? "Click here"
                : "Login"}
          </span>
        </p>

        <img
          onClick={() => setShowLogin(false)}
          src={assets.close_icon}
          alt="close"
          className="absolute top-4 right-4 w-4 h-4 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
        />
      </form>
    </div>
  );
};

export default Login;
