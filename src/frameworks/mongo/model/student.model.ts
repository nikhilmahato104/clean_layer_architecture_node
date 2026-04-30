import { Schema, model } from 'mongoose';
import { IStudentDocument } from '../../../core/entities/student.entity';

/**
 * Student Mongoose Schema.
 * timestamps: true  → auto-manages createdAt / updatedAt
 * versionKey: false → removes __v from all documents
 */
const studentSchema = new Schema<IStudentDocument>(
  {
    name:  { type: String, required: [true, 'Name is required'], trim: true },
    email: {
      type:      String,
      required:  [true, 'Email is required'],
      unique:    true,   // Creates a unique B-tree index in MongoDB
      lowercase: true,
      trim:      true,
    },
    age:   { type: Number, required: [true, 'Age is required'], min: [5, 'Age must be at least 5'] },
    grade: { type: String, required: [true, 'Grade is required'], trim: true },
    phone:     { type: String, trim: true, default: null },
    address:   { type: String, trim: true, default: null },
    is_active: { type: Boolean, default: true },  // Soft-delete flag
  },
  { timestamps: true, versionKey: false }
);

export const Student = model<IStudentDocument>('Student', studentSchema);
