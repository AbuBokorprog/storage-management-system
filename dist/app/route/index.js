"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_route_1 = require("../modules/users/users.route");
const auth_routes_1 = require("../modules/auth/auth.routes");
const folders_route_1 = require("../modules/folders/folders.route");
const files_route_1 = require("../modules/files/files.route");
const dashboard_routes_1 = require("../modules/dashboard/dashboard.routes");
const favorite_route_1 = require("../modules/favorite/favorite.route");
const encrypted_route_1 = require("../modules/encrypted/encrypted.route");
const calender_route_1 = require("../modules/calender/calender.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/dashboard',
        route: dashboard_routes_1.dashboardRoutes,
    },
    {
        path: '/calender',
        route: calender_route_1.calenderRoutes,
    },
    {
        path: '/files',
        route: files_route_1.fileRoutes,
    },
    {
        path: '/folders',
        route: folders_route_1.foldersRoutes,
    },
    {
        path: '/favorite',
        route: favorite_route_1.favoriteRoutes,
    },
    {
        path: '/users',
        route: users_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/encrypt',
        route: encrypted_route_1.encryptedRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
