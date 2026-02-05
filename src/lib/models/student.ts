// src/models/Student.ts
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  // Required basic info
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50,
  },

  // Optional identifiers
  studentId: {
    type: String,
    trim: true,
    maxlength: 50,
    sparse: true, // allows multiple nulls (unique index below would fail otherwise)
  },

  // Core special-ed data (stored as text/JSON for flexibility)
  iepGoals: {
    type: String, // could be JSON string later if you want structured goals
    trim: true,
  },
  progressNotes: {
    type: String,
    trim: true,
  },
  accommodations: {
    type: String,
    trim: true,
  },

  // Relationships
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true,
    index: true, // fast lookups by classroom
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-update updatedAt
studentSchema.pre('save', async function () {
  this.updatedAt = new Date();
  //next();
});

// Optional: compound index if you frequently query by classroom + student name
studentSchema.index({ classroom: 1, lastName: 1, firstName: 1 });

export const Student =
  mongoose.models.Student || mongoose.model('Student', studentSchema);
