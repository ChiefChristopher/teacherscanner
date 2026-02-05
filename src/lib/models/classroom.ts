// src/models/Classroom.ts
import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  qrCodeToken: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

classroomSchema.pre('save', async function () {
  this.updatedAt = new Date();
  //next();
});

export const Classroom =
  mongoose.models.Classroom || mongoose.model('Classroom', classroomSchema);
