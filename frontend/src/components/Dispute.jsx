import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Dispute = ({ projectId, raisedBy, raisedById, againstId }) => {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/disputes/submit",
        {
          projectId,
          raisedBy,
          raisedById,
          againstId,
          reason,
          description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Dispute submitted!");
      setReason("");
      setDescription("");
    } catch (err) {
      toast.error("Error submitting dispute");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Submit a Dispute</h2>
      <input
        className="w-full border rounded p-2 mb-2"
        placeholder="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        required
      />
      <textarea
        className="w-full border rounded p-2 mb-2"
        placeholder="Describe your problem..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Dispute;