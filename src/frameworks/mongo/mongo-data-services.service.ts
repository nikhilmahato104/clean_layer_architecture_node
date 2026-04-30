import { IDataServices }       from '../../core/abstracts/data-service.abstract';
import { IStudentDocument }    from '../../core/entities/student.entity';
import { IMarksDocument }      from '../../core/entities/marks.entity';
import { IGenericRepository }  from '../../core/abstracts/generic-repository.abstract';
import { Student }             from './model/student.model';
import { Marks }               from './model/marks.model';
import { MongoGenericRepository } from './mongo-generic-repository';

/**
 * MongoDataServices — Concrete implementation of IDataServices.
 *
 * WHY: Every data-access path in the app flows through this class.
 * Use-cases receive this via dependency injection and never import Mongoose directly.
 *
 * To add a new collection:
 *   1. Add the property to IDataServices (core/abstracts/data-service.abstract.ts)
 *   2. Import the model
 *   3. Wire it in the constructor below
 */
export class MongoDataServices implements IDataServices {
  students: IGenericRepository<IStudentDocument>;
  marks:    IGenericRepository<IMarksDocument>;

  constructor() {
    // populateOnFind (2nd arg): fields to auto-populate on getAll() / get() calls
    this.students = new MongoGenericRepository<IStudentDocument>(Student);
    this.marks    = new MongoGenericRepository<IMarksDocument>(Marks);

    // Future repos:
    // this.courses  = new MongoGenericRepository<ICourseDocument>(Course, ['teacher_id']);
    // this.teachers = new MongoGenericRepository<ITeacherDocument>(Teacher);
  }
}
