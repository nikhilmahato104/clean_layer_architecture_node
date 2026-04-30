import { Schema, model } from 'mongoose';
import { IMarksDocument } from '../../../core/entities/marks.entity';

/**
 * Marks Mongoose Schema.
 *
 * student_id: ref: 'Student' → enables Mongoose .populate('student_id')
 *   and is the localField used in $lookup aggregation stages.
 *
 * total / percentage / result_grade are computed in the use-case before save,
 * so they are always consistent without needing Mongoose pre-save hooks.
 */
const marksSchema = new Schema<IMarksDocument>(
  {
    student_id: {
      type:     Schema.Types.ObjectId,
      ref:      'Student',          // Enables $lookup: { from: 'students', ... }
      required: [true, 'student_id is required'],
      unique:   true,               // One marks record per student (1-to-1)
      index:    true,               // Index for fast lookup by student_id
    },
    hindi:   { type: Number, required: true, min: 0, max: 100 },
    english: { type: Number, required: true, min: 0, max: 100 },
    math:    { type: Number, required: true, min: 0, max: 100 },
    science: { type: Number, required: true, min: 0, max: 100 },
    sst:     { type: Number, required: true, min: 0, max: 100 },

    // Computed fields — always set by use-case before create/update
    total:        { type: Number, required: true },   // max 500
    percentage:   { type: Number, required: true },   // 0.00 – 100.00
    result_grade: { type: String, required: true },   // A+ / A / B / C / D / F
  },
  { timestamps: true, versionKey: false }
);

export const Marks = model<IMarksDocument>('Marks', marksSchema);
