
const Project = require('../models/Project');
const Escrow = require('../models/Escrow'); 
const razorpay = require('../config/razorpay');
const crypto = require("crypto");
const Project = require("../models/Project");

exports.initiateEscrowPayment = async (req, res) => {
  const { amount, projectId, companyId, freelancerId } = req.body;

  const options = {
    amount: amount * 100, // INR in paisa
    currency: "INR",
    receipt: `receipt_${projectId}_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  const escrow = new Escrow({
    project: projectId,
    freelancer: freelancerId,
    company: companyId,
    amount,
    status: 'pending',
    razorpayOrderId: order.id,
  });

  await escrow.save();

  res.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    paymentUrl: `https://checkout.razorpay.com/v1/checkout.js?order_id=${order.id}`,
  });
};


exports.initiateEscrowPayment = async (req, res) => {
 try {
    const { projectId, freelancerId, companyId, amount } = req.body;
    if (!projectId || !freelancerId || !companyId || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const escrow = new Escrow({
      projectId,
      freelancerId,
      companyId,
      amount,
      status: "inProgress",
    });

    await escrow.save();
    // Here you would typically integrate with a payment gateway to handle the payment
    // For demonstration, we'll just return a mock payment URL
    const paymentUrl = `https://example-escrow.com/pay/${escrow._id}`;

    res.status(200).json({ paymentUrl });
  } catch (error) {
    console.error("Escrow initiation error:", error);
    res.status(500).json({ message: "Escrow initiation failed" });
  }
};

exports.markProjectAsInProgress = async (req, res) => {
  const { projectId } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found." });

    project.status = "inProgress"; // or however your status is defined
    await project.save();

    res.status(200).json({ message: "Project marked as in progress." });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ message: "Failed to update project status." });
  }
};



exports.verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // Update Escrow record
    const escrow = await Escrow.findOne({ razorpayOrderId: razorpay_order_id });
    if (!escrow) return res.status(404).json({ message: "Escrow record not found" });

    escrow.status = "inProgress";
    escrow.razorpayPaymentId = razorpay_payment_id;
    escrow.razorpaySignature = razorpay_signature;
    await escrow.save();

    // Mark Project as "inProgress"
    await Project.findByIdAndUpdate(escrow.project, { status: "inProgress" });

    res.json({ success: true, message: "Payment verified and escrow updated" });
  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).json({ success: false, error: "Server error during verification" });
  }
};
