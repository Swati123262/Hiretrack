import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AddJob({ onAdd }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!company || !role) return;

    onAdd({ company, role, status });
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <Link
        to="/"
        className="text-indigo-500 hover:underline text-sm mb-6 inline-block"
      >
        ← Back to Home
      </Link>

      <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
        Add New Job
      </h2>

      <p className="text-gray-400 mb-8">
        Fill in the details below to track your application 📋
      </p>

      <div className="bg-white rounded-2xl shadow-lg p-8 grid gap-6">
        <div>
          <label className="text-sm font-bold text-gray-600 mb-2 block">
            🏢 Company Name
          </label>

          <input
            type="text"
            placeholder="e.g. Google, TCS, Infosys"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-gray-600 mb-2 block">
            💼 Job Role
          </label>

          <input
            type="text"
            placeholder="e.g. React Developer, UI Designer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-gray-600 mb-2 block">
            📊 Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Selected">Selected</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-6 py-3 font-bold hover:opacity-90 transition text-lg shadow-md"
        >
          ✅ Add Job
        </button>
      </div>
    </div>
  );
}

export default AddJob;