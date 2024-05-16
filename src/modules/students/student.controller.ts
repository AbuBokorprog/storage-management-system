import { Request, Response } from 'express';
import { StudentServices } from './studnet.service';

const studentCreate = async (req: Request, res: Response) => {
  const student = req.body;

  //   will call service function and send data

  try {
    const result = await StudentServices.createStudentIntoMongodb(student);
    res.status(200).json({
      success: true,
      message: 'Student create successfully',
      result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error as string,
    });
  }
};

export const StudentController = {
  studentCreate,
};
