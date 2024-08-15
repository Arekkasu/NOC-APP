import mongoose from "mongoose";
import { type } from "os";
/*
  level: LogSecurityLevel;
  mesage: string,
  origin: string,
  createdAt?: Date
  
 
 */

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    enum: ["low", "medium", "high"],
  },
  message: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export const LogModel = mongoose.model('Log', logSchema)
