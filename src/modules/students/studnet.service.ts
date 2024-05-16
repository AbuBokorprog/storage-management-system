import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoMongodb = async (student: Student) => {
  const result = await StudentModel.student.create(student);
  return result;
};

export const StudentServices = {
  createStudentIntoMongodb,
};
