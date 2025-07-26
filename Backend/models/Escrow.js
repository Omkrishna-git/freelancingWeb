const mongoose = require("mongoose");

const escrowSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Freelancer",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Escrow", "Released", "Refunded", "inProgress"],
    default: "Pending",
  },
  transactionId: {
    type: String,
    default: null, // Store reference from payment gateway
  },
  depositedAt: {
    type: Date,
    default: Date.now,
  },
  releasedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Escrow", escrowSchema);
