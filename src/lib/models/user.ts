// src/models/User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    trim: true,
  },
  subscriptionTier: {
    type: String,
    enum: ['free', 'starter', 'professional', 'school'],
    default: 'free',
  },
  subscriptionStatus: {
    type: String,
    enum: ['active', 'canceled', 'trialing', 'past_due'],
    default: 'active',
  },
  subscriptionExpiresAt: {
    type: Date,
  },
  maxClassrooms: {
    type: Number,
    default: 1,
  },
  maxStudentsPerClass: {
    type: Number,
    default: 5,
  },
  maxUsersPerAccount: {
    type: Number,
    default: 1,
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

// Auto-update updatedAt on save
userSchema.pre('save', async function () {
  this.updatedAt = new Date();
  //next();
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
