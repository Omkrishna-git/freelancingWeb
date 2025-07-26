const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: { type: [String], required: true },
  deadline: { type: Date, required: true },
  cost: { type: Number, required: true },
  paymentMode: {
    type: String,
    enum: ['Through this platform', 'Independent of platform'],
    required: true
  },
  references: {
    data: Buffer,
    contentType: String,
    filename: String
  },
  agreement: {
    data: Buffer,
    contentType: String,
    filename: String
  },
  modeOfWork: {
    type: String,
    enum: ['Remote', 'Onsite', 'Hybrid'],
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'Accepted', 'In Progress', 'Completed'],
    default: 'Open'
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  author: {
    name: { type: String, default: 'Unknown' },
    profileImage: { type: String, default: '' }
  },

  // The freelancer who was approved
  acceptedFreelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Freelancer'
  },

  // New: Freelancers who applied
  applicants: [
    {
      freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer' },
      status: { type: String, enum: ['applied', 'rejected', 'accepted'], default: 'applied' },
      appliedAt: { type: Date, default: Date.now }
    }
  ],

  rating: { type: Number, default: 0 }

}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
