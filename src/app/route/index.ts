import express from 'express';
import { UserRoutes } from '../modules/users/users.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { foldersRoutes } from '../modules/folders/folders.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/folder',
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
