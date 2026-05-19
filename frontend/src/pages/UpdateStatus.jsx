import { useState } from "react";

import API from "../services/api";

import { useParams } from "react-router-dom";

function UpdateStatus() {

  const { id } = useParams();

  const [status, setStatus] = useState("");

  const updateStatus = async () => {

    try {

      await API.put(
        `/complaints/${id}`,
        { status }
      );

      alert("Status Updated");

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div>

      <h2>Update Complaint Status</h2>

      <input
        type="text"
        placeholder="Enter New Status"
        onChange={(e) =>
          setStatus(e.target.value)
        }
      />

      <button onClick={updateStatus}>
        Update
      </button>

    </div>
  );
}

export default UpdateStatus;