import { Request, Response }   from 'express';
import asyncHandler             from '../utils/async-handler.util';
import { sendSuccess, sendError } from '../utils/response.util';
import { MongoDataServices }    from '../frameworks/mongo';
import { MarksUseCase }         from '../use-cases';
import { createMarksSchema, updateMarksSchema } from '../core/dtos';

const dataServices = new MongoDataServices();
const marksUseCase = new MarksUseCase(dataServices);

/** GET /api/v1/marks */
export const getAllMarks = asyncHandler(async (req: Request, res: Response) => {
  const result = await marksUseCase.getAllMarks(req.query as Record<string, string>);
  sendSuccess(res, 'Marks fetched successfully', result);
});

/** GET /api/v1/marks/:id */
export const getMarksById = asyncHandler(async (req: Request, res: Response) => {
  const marks = await marksUseCase.getMarksById(req.params['id']!);
  sendSuccess(res, 'Marks fetched successfully', marks);
});

/** GET /api/v1/marks/student/:studentId */
export const getMarksByStudentId = asyncHandler(async (req: Request, res: Response) => {
  const marks = await marksUseCase.getMarksByStudentId(req.params['studentId']!);
  sendSuccess(res, 'Student marks fetched successfully', marks);
});

/** POST /api/v1/marks */
export const createMarks = asyncHandler(async (req: Request, res: Response) => {
  const { error, value } = createMarksSchema.validate(req.body, { abortEarly: false });
  if (error) return sendError(res, 'Validation failed', 400, error.details.map(d => d.message));

  const marks = await marksUseCase.createMarks(value);
  sendSuccess(res, 'Marks created successfully', marks, 201);
});

/** PATCH /api/v1/marks/:id */
export const updateMarks = asyncHandler(async (req: Request, res: Response) => {
  const { error, value } = updateMarksSchema.validate(req.body, { abortEarly: false });
  if (error) return sendError(res, 'Validation failed', 400, error.details.map(d => d.message));

  const marks = await marksUseCase.updateMarks(req.params['id']!, value);
  sendSuccess(res, 'Marks updated successfully', marks);
});

/** DELETE /api/v1/marks/:id */
export const deleteMarks = asyncHandler(async (req: Request, res: Response) => {
  await marksUseCase.deleteMarks(req.params['id']!);
  sendSuccess(res, 'Marks deleted successfully', null);
});
