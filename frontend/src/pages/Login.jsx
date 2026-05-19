import { useState } from "react";

import API from "../services/api";

import {
  Link,
  useNavigate
} from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/complaints");

    } catch (error) {

      alert(error.response.data.message);
    }
  };

  return (

    <div className="flex justify-center items-center min-h-screen px-4">

      <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-slate-700">

        <h2 className="text-4xl font-bold text-center text-cyan-400 mb-8">
          Welcome Back
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-900 text-white border border-slate-600 focus:outline-none focus:border-cyan-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-900 text-white border border-slate-600 focus:outline-none focus:border-cyan-400"
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition text-black font-bold py-4 rounded-xl text-lg"
          >
            Login
          </button>

        </form>

        <p className="text-center text-slate-300 mt-6">

          New User?

          <Link
            to="/signup"
            className="text-cyan-400 ml-2 font-bold"
          >
            Signup
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;