/**
 * swagger.ts — Central OpenAPI spec builder.
 *
 * WHY folder-based swagger modules:
 * Each route module (student, marks, course…) owns its swagger paths + schemas.
 * This file simply spreads them together. When you add a new resource:
 *   1. Create src/routes/resource/resource.swagger.ts
 *   2. Import and spread below — no other file needs to change.
 *
 * This is equivalent to NestJS @ApiTags / @ApiProperty decorators
 * but explicit and without decorators.
 */
import { studentPaths, studentSchemas } from '../routes/student/student.swagger';
import { marksPaths,   marksSchemas }   from '../routes/marks/marks.swagger';

export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title:       'Student API',
    version:     '1.0.0',
    description: [
      'Student + Marks CRUD API built with **Node.js + Express.js + TypeScript**.',
      '',
      '**Architecture layers:**',
      '`Controller → Use-Case → IDataServices → MongoGenericRepository → MongoDB`',
      '',
      '**Swagger structure:** Each module owns its swagger file (`module.swagger.ts`).',
      'Adding a new resource only requires creating a new swagger file and spreading it here.',
    ].join('\n'),
  },
  servers: [
    { url: 'http://localhost:3000/api/v1', description: 'Development server' },
  ],
  tags: [
    { name: 'Students', description: 'Student management' },
    { name: 'Marks',    description: 'Subject-wise marks with student info via $lookup' },
  ],
  paths: {
    // Each module contributes its own paths — spread here
    ...studentPaths,
    ...marksPaths,

    // Future modules:
    // ...coursePaths,
    // ...teacherPaths,
  },
  components: {
    schemas: {
      // Each module contributes its own schemas — spread here
      ...studentSchemas,
      ...marksSchemas,

      // Shared response envelope (used by both modules)
      ApiError: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string',  example: 'Validation failed' },
          errors:  { type: 'array',   items: { type: 'string' } },
        },
      },
    },
  },
};
