import { Schema, model } from 'mongoose';
import { Student } from './student.interface';

const StudentsSchema = new Schema<Student>({});

const student = model<Student>('Student', StudentsSchema);
export const StudentModel = {
  student,
};
