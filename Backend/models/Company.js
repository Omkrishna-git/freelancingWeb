const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  organization: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, default: "active" }
});

module.exports = mongoose.model("Company", CompanySchema);
