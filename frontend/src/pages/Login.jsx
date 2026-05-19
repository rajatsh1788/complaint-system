import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: ""
    });

  const [loading, setLoading] =
    useState(false);

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  // HANDLE LOGIN

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await API.post(
          "/auth/login",
          formData
        );

      // SAVE TOKEN

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert(
        "✅ Login Successful"
      );

      // REDIRECT

      navigate("/complaints");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center px-4 py-10">

      <div className="w-full max-w-md bg-slate-800/90 backdrop-blur-lg border border-slate-700 rounded-3xl shadow-2xl p-8">

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="text-6xl mb-3">
            🔐
          </div>

          <h1 className="text-4xl font-bold text-cyan-400">

            Welcome Back

          </h1>

          <p className="text-slate-400 mt-2">

            Login to Smart Complaint AI System

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* EMAIL */}

          <div>

            <label className="block text-slate-300 mb-2">

              Email Address

            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-2xl bg-slate-900 text-white border border-slate-600 focus:outline-none focus:border-cyan-400"
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block text-slate-300 mb-2">

              Password

            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-2xl bg-slate-900 text-white border border-slate-600 focus:outline-none focus:border-cyan-400"
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition duration-300 text-black font-bold py-4 rounded-2xl text-lg shadow-lg"
          >

            {
              loading
                ? "Logging in..."
                : "Login"
            }

          </button>

        </form>

        {/* SIGNUP LINK */}

        <p className="text-center text-slate-300 mt-6">

          Don't have an account?

          <Link
            to="/signup"
            className="text-cyan-400 font-bold ml-2 hover:underline"
          >
            Signup
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;