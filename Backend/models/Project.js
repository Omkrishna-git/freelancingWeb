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
    enum: ['Open', 'In Progress', 'Completed', 'Cancelled'],
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
  rating: { type: Number, default: 0 },
  price: { type: Number, default: 0 } // optional field if cost isn't used in price display
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
