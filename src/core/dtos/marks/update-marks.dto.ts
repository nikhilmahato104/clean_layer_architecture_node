import Joi from 'joi';

export interface UpdateMarksDto {
  hindi?:   number;
  english?: number;
  math?:    number;
  science?: number;
  sst?:     number;
}

/** student_id is not updatable — marks belong to one student permanently */
export const updateMarksSchema = Joi.object<UpdateMarksDto>({
  hindi:   Joi.number().integer().min(0).max(100).optional(),
  english: Joi.number().integer().min(0).max(100).optional(),
  math:    Joi.number().integer().min(0).max(100).optional(),
  science: Joi.number().integer().min(0).max(100).optional(),
  sst:     Joi.number().integer().min(0).max(100).optional(),
}).min(1).messages({ 'object.min': 'At least one subject marks must be provided' });
