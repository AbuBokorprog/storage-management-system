import express from 'express';
import { StudentController } from './student.controller';
const route = express.Router();

// we call controller function
route.post('/createStudent', StudentController.studentCreate);
