import express from 'express';
import { UserRoutes } from '../modules/users/users.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { foldersRoutes } from '../modules/folders/folders.route';
import { fileRoutes } from '../modules/files/files.route';
import { dashboardRoutes } from '../modules/dashboard/dashboard.routes';
import { favoriteRoutes } from '../modules/favorite/favorite.route';
import { encryptedRoutes } from '../modules/encrypted/encrypted.route';
import { calenderRoutes } from '../modules/calender/calender.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/dashboard',
    route: dashboardRoutes,
  },
  {
    path: '/calender',
    route: calenderRoutes,
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
    path: '/favorite',
    route: favoriteRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/encrypt',
    route: encryptedRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
