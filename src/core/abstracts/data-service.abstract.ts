import { IGenericRepository } from './generic-repository.abstract';
import { IStudentDocument }   from '../entities/student.entity';
import { IMarksDocument }     from '../entities/marks.entity';

/**
 * IDataServices — Single entry point to all database repositories.
 *
 * WHY: Instead of injecting N separate repos into every use-case,
 * inject one IDataServices that exposes them all as typed properties.
 * Adding a new collection = adding one property here + wiring it in MongoDataServices.
 */
export interface IDataServices {
  students: IGenericRepository<IStudentDocument>;
  marks:    IGenericRepository<IMarksDocument>;

  // Scale up by adding repos here:
  // courses:     IGenericRepository<ICourseDocument>;
  // teachers:    IGenericRepository<ITeacherDocument>;
  // enrollments: IGenericRepository<IEnrollmentDocument>;
}
