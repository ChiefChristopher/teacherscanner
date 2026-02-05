// src/models/ClassroomUser.ts
import mongoose from 'mongoose';

const classroomUserSchema = new mongoose.Schema({
  // Foreign keys
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true,
    index: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  // Role/permissions within this classroom
  role: {
    type: String,
    enum: ['owner', 'editor', 'viewer'],
    default: 'editor',
    required: true,
  },

  // When they were added
  joinedAt: {
    type: Date,
    default: Date.now,
  },

  // Optional: expiration or status (for future features like temporary access)
  status: {
    type: String,
    enum: ['active', 'pending', 'removed'],
    default: 'active',
  },
});

// Composite unique index: one user can only have one role per classroom
classroomUserSchema.index({ classroom: 1, user: 1 }, { unique: true });

export const ClassroomUser =
  mongoose.models.ClassroomUser ||
  mongoose.model('ClassroomUser', classroomUserSchema);
