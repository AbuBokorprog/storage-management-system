import express from 'express';
import { dashboardController } from './dashboard.controller';
import auth from '../../middleware/auth';
const router = express.Router();

router.get('/summary', auth(), dashboardController.dashboardSummary);

export const dashboardRoutes = router;
