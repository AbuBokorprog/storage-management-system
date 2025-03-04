import express from 'express';
import { UserRoutes } from '../modules/users/users.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { foldersRoutes } from '../modules/folders/folders.route';
import { fileRoutes } from '../modules/files/files.route';
import { dashboardRoutes } from '../modules/dashboard/dashboard.routes';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/dashboard',
    route: dashboardRoutes,
  },
  {
    path: '/files',
    route: fileRoutes,
  },
  {
    path: '/folders',
    route: foldersRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
