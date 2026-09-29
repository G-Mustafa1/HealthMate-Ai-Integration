const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  fileUrl: { type: String },
  filename: { type: String },
  public_id: { type: String, default: "" },
  resource_type: { type: String, enum: ['image', 'raw'], default: 'image' },
  title: { type: String, default: "" },
  dateSeen: { type: String, default: "" },
  summary: { type: String, default: "" },
  explanation_en: { type: String, default: "" },
  explanation_ro: { type: String, default: "" },
  suggested_questions: { type: [String], default: [] }
}, {
  collection: 'reports',
  timestamps: true
});

const Report = mongoose.model('Report', reportSchema);
module.exports = { Report };
