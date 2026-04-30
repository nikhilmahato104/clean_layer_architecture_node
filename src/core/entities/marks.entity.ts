import { Document, Types } from 'mongoose';

/**
 * IMarks — Domain interface for a student's subject-wise marks.
 * One marks record per student (one-to-one with Student collection).
 *
 * Computed fields (total, percentage, result_grade) are calculated in the
 * use-case layer before persisting — no Mongoose hooks needed.
 */
export interface IMarks {
  student_id:   Types.ObjectId;  // FK → Student._id
  hindi:        number;          // out of 100
  english:      number;          // out of 100
  math:         number;          // out of 100
  science:      number;          // out of 100
  sst:          number;          // out of 100 (Social Science & Technology)
  total:        number;          // auto-computed: sum of all subjects (max 500)
  percentage:   number;          // auto-computed: (total / 500) * 100
  result_grade: string;          // auto-computed: A+ / A / B / C / D / F
}

/** IMarksDocument — Mongoose Document extension for the marks collection */
export interface IMarksDocument extends IMarks, Document {}
