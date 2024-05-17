import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import { StudentRoutes } from './modules/students/student.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes

// app.use('/api/v1/student', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Project setup home page');
});

export default app;
