import Joi from 'joi';

export interface UpdateStudentDto {
  name?:      string;
  email?:     string;
  age?:       number;
  grade?:     string;
  phone?:     string;
  address?:   string;
  is_active?: boolean;
}

/** All fields optional for PATCH. .min(1) prevents empty {} body */
export const updateStudentSchema = Joi.object<UpdateStudentDto>({
  name:      Joi.string().trim().min(2).max(100).optional(),
  email:     Joi.string().email().lowercase().trim().optional(),
  age:       Joi.number().integer().min(5).max(100).optional(),
  grade:     Joi.string().trim().optional(),
  phone:     Joi.string().trim().optional().allow(''),
  address:   Joi.string().trim().optional().allow(''),
  is_active: Joi.boolean().optional(),
}).min(1).messages({ 'object.min': 'At least one field must be provided' });
