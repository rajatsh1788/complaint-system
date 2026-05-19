import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="bg-slate-900 shadow-2xl border-b border-slate-700">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-3xl font-bold text-cyan-400">
          Smart Complaint AI
        </h1>

        <div className="space-x-6 text-lg">

          <Link
            to="/complaints"
            className="text-white hover:text-cyan-400 transition"
          >
            Complaints
          </Link>

          <Link
            to="/add-complaint"
            className="text-white hover:text-cyan-400 transition"
          >
            Add Complaint
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;