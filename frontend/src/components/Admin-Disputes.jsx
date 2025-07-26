import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const AdminDisputes = () => {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    axios
    axios
  .get("http://localhost:8000/api/disputes", { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
        setDisputes(res.data);
      })
   .catch(() => setDisputes([]))
      .finally(() => setLoading(false));
  }, [token]);

  const handleUpdate = async (id, status) => {
    const resolution = prompt("Enter resolution message:");
    if (!resolution) return;
    try {
      await axios.put(
        `http://localhost:8000/api/disputes/${id}`,
        { status, resolution },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDisputes((prev) =>
        prev.map((d) =>
          d._id === id ? { ...d, status, resolution } : d
        )
      );
    } catch (error) {
      alert("Failed to update dispute status.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dispute Management</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : Array.isArray(disputes) && disputes.length === 0 ? (
        <p className="text-center text-gray-500">No disputes found.</p>
      ) : Array.isArray(disputes) ? (
        disputes.map((d) => (
          <div
            key={d._id}
            className="border border-gray-300 rounded-md p-5 mb-5 shadow-sm"
          >
            <p className="mb-2">
              <span className="font-semibold">Problem:</span> {d.description}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Submitted By:</span>{" "}
              {d.raisedById?.fullName || d.raisedById?.organization || "N/A"}
              {d.raisedById?.email && (
                <span className="text-sm text-gray-500">
                  {" "}
                  ({d.raisedById.email})
                </span>
              )}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Against:</span>{" "}
              {d.againstId?.fullName || d.againstId?.organization || "N/A"}
              {d.againstId?.email && (
                <span className="text-sm text-gray-500">
                  {" "}
                  ({d.againstId.email})
                </span>
              )}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Project:</span>{" "}
              {d.projectId?.title || "N/A"}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`font-medium ${
                  d.status === "pending"
                    ? "text-yellow-600"
                    : d.status === "resolved"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {d.status}
              </span>
            </p>
            {d.resolution && (
              <p className="mb-1">
                <span className="font-semibold">Resolution:</span>{" "}
                {d.resolution}
              </p>
            )}
            <p className="mb-1 text-sm text-gray-500">
              Created At: {moment(d.createdAt).format("DD MMM YYYY, hh:mm A")}
            </p>

            {(d.status === "pending" || d.status === "open") && (
              <div className="mt-3 flex gap-3">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  onClick={() => handleUpdate(d._id, "resolved")}
                >
                  Resolve
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  onClick={() => handleUpdate(d._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-red-500">Error: Disputes data is not an array.</p>
      )}
    </div>
  );
};

export default AdminDisputes;
