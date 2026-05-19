import { useState } from "react";

import API from "../services/api";

import {
  Link,
  useNavigate
} from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await API.post(
        "/auth/signup",
        formData
      );

      alert(
        "✅ Signup Successful"
      );

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Signup Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center px-4 py-10">

      <div className="w-full max-w-md bg-slate-800/90 backdrop-blur-lg border border-slate-700 rounded-3xl shadow-2xl p-8">

        {/* LOGO / TITLE */}

        <div className="text-center mb-8">

          <div className="text-6xl mb-3">
            🛡️
          </div>

          <h1 className="text-4xl font-bold text-cyan-400">
            Create Account
          </h1>

          <p className="text-slate-400 mt-2">
            Join Smart Complaint AI System
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* NAME */}

          <div>

            <label className="block text-slate-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Full Name"
              required
              className="w-full p-4 rounded-2xl bg-slate-900 text-white border border-slate-600 focus:outline-none focus:border-cyan-400"
            />

          </div>

          {/* EMAIL */}

          <div>

            <label className="block text-slate-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
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
                ? "Creating Account..."
                : "Signup"
            }

          </button>

        </form>

        {/* LOGIN LINK */}

        <p className="text-center text-slate-300 mt-6">

          Already have an account?

          <Link
            to="/login"
            className="text-cyan-400 font-bold ml-2 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;