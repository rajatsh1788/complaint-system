import { useState } from "react";

import API from "../services/api";

import {
  useParams,
  useNavigate
} from "react-router-dom";

function UpdateStatus() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [status, setStatus] =
    useState("Pending");

  const [loading, setLoading] =
    useState(false);

  const updateStatus = async () => {

    try {

      setLoading(true);

      await API.put(
        `/complaints/${id}`,
        { status }
      );

      alert(
        "✅ Status Updated Successfully"
      );

      navigate("/complaints");

    } catch (error) {

      console.log(error);

      alert(
        "❌ Update Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center px-4">

      <div className="bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">

          Update Complaint Status

        </h2>

        {/* STATUS SELECT */}

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="w-full p-4 rounded-2xl bg-slate-900 text-white border border-slate-600 focus:outline-none focus:border-cyan-400 mb-6"
        >

          <option value="Pending">
            Pending
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Resolved">
            Resolved
          </option>

        </select>

        {/* BUTTON */}

        <button
          onClick={updateStatus}
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 transition duration-300 text-black font-bold py-4 rounded-2xl"
        >

          {
            loading
              ? "Updating..."
              : "Update Status"
          }

        </button>

      </div>

    </div>
  );
}

export default UpdateStatus;