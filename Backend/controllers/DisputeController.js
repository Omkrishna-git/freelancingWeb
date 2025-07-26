const Dispute = require("../models/DisputeModel");

// Submit dispute (Freelancer or Company)
exports.submitDispute = async (req, res) => {
  try {
    const { projectId, raisedBy, raisedById, againstId, reason, description } = req.body;
    if (!projectId || !raisedBy || !raisedById || !againstId || !reason || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const dispute = new Dispute({
      projectId,
      raisedBy,
      raisedById,
      againstId,
      reason,
      description,
      status: "open",
      createdAt: new Date()
    });

    await dispute.save();
    res.status(201).json({ message: "Dispute submitted successfully", dispute });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all disputes (Admin)
exports.getAllDisputes = async (req, res) => {
  try {
    const disputes = await Dispute.find()
      .populate("projectId", "title")
      .populate("raisedById", "fullName organization email")
      .populate("againstId", "fullName organization email");
    res.json(disputes); // Return array, not { disputes: disputes }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Resolve or reject dispute (Admin)
exports.updateDisputeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, resolution } = req.body;
    if (!["resolved", "rejected", "pending", "open"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const dispute = await Dispute.findByIdAndUpdate(
      id,
      { status, resolution },
      { new: true }
    );
    if (!dispute) return res.status(404).json({ message: "Dispute not found" });
    res.json(dispute);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};