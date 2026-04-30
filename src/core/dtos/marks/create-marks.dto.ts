import Joi from 'joi';

export interface CreateMarksDto {
  student_id: string;
  hindi:      number;
  english:    number;
  math:       number;
  science:    number;
  sst:        number;
}

/** Each subject is 0–100. student_id must be a valid MongoDB ObjectId (24 hex chars). */
export const createMarksSchema = Joi.object<CreateMarksDto>({
  student_id: Joi.string().hex().length(24).required()
               .messages({ 'any.required': 'student_id is required', 'string.length': 'student_id must be a valid MongoDB ObjectId' }),
  hindi:   Joi.number().integer().min(0).max(100).required().messages({ 'any.required': 'Hindi marks required' }),
  english: Joi.number().integer().min(0).max(100).required().messages({ 'any.required': 'English marks required' }),
  math:    Joi.number().integer().min(0).max(100).required().messages({ 'any.required': 'Math marks required' }),
  science: Joi.number().integer().min(0).max(100).required().messages({ 'any.required': 'Science marks required' }),
  sst:     Joi.number().integer().min(0).max(100).required().messages({ 'any.required': 'SST marks required' }),
});
