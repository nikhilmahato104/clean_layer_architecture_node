import { Document } from 'mongoose';

/**
 * IStudent — Pure domain interface for a Student.
 * No Mongoose-specific types here — keeps the domain layer framework-agnostic.
 */
export interface IStudent {
  name:      string;
  email:     string;
  age:       number;
  grade:     string;
  phone?:    string | null;
  address?:  string | null;
  is_active: boolean;
}

/** IStudentDocument — Mongoose Document extension used in the framework layer */
export interface IStudentDocument extends IStudent, Document {}
