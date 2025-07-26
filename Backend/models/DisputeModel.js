const mongoose = require("mongoose");

const DisputeSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  raisedBy: { type: String, enum: ["freelancer", "company", "admin"], required: true },
  raisedById: { type: mongoose.Schema.Types.ObjectId, required: true },
  againstId: { type: mongoose.Schema.Types.ObjectId, required: true },
  reason: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["open", "pending", "resolved", "rejected"], default: "open" },
  resolution: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Dispute", DisputeSchema);