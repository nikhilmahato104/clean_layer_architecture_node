import { Request, Response }   from 'express';
import asyncHandler             from '../utils/async-handler.util';
import { sendSuccess, sendError } from '../utils/response.util';
import { MongoDataServices }    from '../frameworks/mongo';
import { StudentUseCase }       from '../use-cases';
import { createStudentSchema, updateStudentSchema } from '../core/dtos';

const dataServices   = new MongoDataServices();
const studentUseCase = new StudentUseCase(dataServices);

/** GET /api/v1/students */
export const getAllStudents = asyncHandler(async (req: Request, res: Response) => {
  const result = await studentUseCase.getAllStudents(req.query as Record<string, string>);
  sendSuccess(res, 'Students fetched successfully', result);
});

/** GET /api/v1/students/summary/grades */
export const getGradeSummary = asyncHandler(async (_req: Request, res: Response) => {
  const summary = await studentUseCase.getGradeSummary();
  sendSuccess(res, 'Grade summary fetched successfully', summary);
});

/** GET /api/v1/students/:id */
export const getStudentById = asyncHandler(async (req: Request, res: Response) => {
  const student = await studentUseCase.getStudentById(req.params['id']!);
  sendSuccess(res, 'Student fetched successfully', student);
});

/** POST /api/v1/students */
export const createStudent = asyncHandler(async (req: Request, res: Response) => {
  const { error, value } = createStudentSchema.validate(req.body, { abortEarly: false });
  if (error) return sendError(res, 'Validation failed', 400, error.details.map(d => d.message));

  const student = await studentUseCase.createStudent(value);
  sendSuccess(res, 'Student created successfully', student, 201);
});

/** PATCH /api/v1/students/:id */
export const updateStudent = asyncHandler(async (req: Request, res: Response) => {
  const { error, value } = updateStudentSchema.validate(req.body, { abortEarly: false });
  if (error) return sendError(res, 'Validation failed', 400, error.details.map(d => d.message));

  const student = await studentUseCase.updateStudent(req.params['id']!, value);
  sendSuccess(res, 'Student updated successfully', student);
});

/** DELETE /api/v1/students/:id */
export const deleteStudent = asyncHandler(async (req: Request, res: Response) => {
  await studentUseCase.deleteStudent(req.params['id']!);
  sendSuccess(res, 'Student deleted successfully', null);
});
