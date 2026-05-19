import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function ComplaintList() {

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredComplaints, setFilteredComplaints] = useState([]);

  // Fetch Complaints
  const fetchComplaints = async () => {

    try {

      const res = await API.get("/complaints");

      setComplaints(res.data);
      setFilteredComplaints(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchComplaints();

  }, []);

  // Search by Location
  const handleSearch = () => {

    const filtered = complaints.filter((item) =>
      item.location
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredComplaints(filtered);
  };

  return (

    <div className="min-h-screen px-6 py-10">

      {/* Heading */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-cyan-400">
          Complaint Dashboard
        </h1>

        <Link
          to="/add-complaint"
          className="mt-4 md:mt-0 bg-cyan-500 hover:bg-cyan-600 transition px-6 py-3 rounded-xl text-black font-bold shadow-lg"
        >
          + Add Complaint
        </Link>

      </div>

      {/* Search Bar */}
      <div className="bg-slate-800 p-5 rounded-2xl shadow-xl border border-slate-700 mb-8">

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search by Location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-4 rounded-xl bg-slate-900 text-white border border-slate-600 focus:outline-none focus:border-cyan-400"
          />

          <button
            onClick={handleSearch}
            className="bg-cyan-500 hover:bg-cyan-600 transition px-6 py-3 rounded-xl text-black font-bold"
          >
            Search
          </button>

        </div>

      </div>

      {/* Complaint Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {
          filteredComplaints.map((item) => (

            <div
              key={item._id}
              className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-6 hover:scale-105 transition duration-300"
            >

              {/* Title */}
              <h2 className="text-2xl font-bold text-cyan-400 mb-3">
                {item.title}
              </h2>

              {/* Description */}
              <p className="text-slate-300 mb-4">
                {item.description}
              </p>

              {/* Details */}
              <div className="space-y-2 text-slate-200">

                <p>
                  <span className="font-bold text-yellow-400">
                    Category:
                  </span>
                  {" "}
                  {item.category}
                </p>

                <p>
                  <span className="font-bold text-green-400">
                    Status:
                  </span>
                  {" "}
                  {item.status}
                </p>

                <p>
                  <span className="font-bold text-pink-400">
                    Location:
                  </span>
                  {" "}
                  {item.location}
                </p>

                <p>
                  <span className="font-bold text-orange-400">
                    Email:
                  </span>
                  {" "}
                  {item.email}
                </p>

              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-between items-center">

                <Link
                  to={`/update/${item._id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 transition px-4 py-2 rounded-lg text-black font-bold"
                >
                  Update
                </Link>

                <span className="text-sm text-slate-400">
                  Complaint ID
                </span>

              </div>

            </div>
          ))
        }

      </div>

      {/* No Complaints */}
      {
        filteredComplaints.length === 0 && (

          <div className="text-center mt-20">

            <h2 className="text-3xl text-red-400 font-bold">
              No Complaints Found
            </h2>

          </div>
        )
      }

    </div>
  );
}

export default ComplaintList;