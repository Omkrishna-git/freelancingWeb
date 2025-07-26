const mongoose = require("mongoose");

const FreelancerProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    categories: [{ type: String }],
    author: {
      name: { type: String, required: true },
      profileImage: { type: String },
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    // budget: { type: Number },
    technologies: [{ type: String }],
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Freelancer",
    },
    // status: {
    //   type: String,
    //   enum: ["open", "in progress", "completed"],
    //   default: "open",
    // },
    location: {type:String}, 

  },
  { timestamps: true }
);

module.exports = mongoose.model("FreelancerProject", FreelancerProjectSchema);
