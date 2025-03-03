"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_route_1 = require("../modules/users/users.route");
const auth_routes_1 = require("../modules/auth/auth.routes");
const folders_route_1 = require("../modules/folders/folders.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/folder',
        route: folders_route_1.foldersRoutes,
    },
    {
        path: '/users',
        route: users_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
