import Joi from 'joi';

export interface CreateStudentDto {
  name:     string;
  email:    string;
  age:      number;
  grade:    string;
  phone?:   string;
  address?: string;
}

/**
 * Validated at the HTTP boundary (controller layer) before any business logic runs.
 * abortEarly: false collects ALL validation errors in one response instead of stopping at first.
 */
export const createStudentSchema = Joi.object<CreateStudentDto>({
  name:    Joi.string().trim().min(2).max(100).required()
             .messages({ 'string.min': 'Name must be at least 2 characters', 'any.required': 'Name is required' }),
  email:   Joi.string().email().lowercase().trim().required()
             .messages({ 'string.email': 'Provide a valid email', 'any.required': 'Email is required' }),
  age:     Joi.number().integer().min(5).max(100).required()
             .messages({ 'any.required': 'Age is required' }),
  grade:   Joi.string().trim().required()
             .messages({ 'any.required': 'Grade is required' }),
  phone:   Joi.string().trim().optional().allow(''),
  address: Joi.string().trim().optional().allow(''),
});
