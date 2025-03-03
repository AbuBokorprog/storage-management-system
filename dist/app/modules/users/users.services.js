"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersServices = void 0;
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const users_model_1 = require("./users.model");
const getAllUsers = async () => {
    const user = await users_model_1.User.find();
    return user;
};
const getMe = async (userid) => {
    const user = await users_model_1.User.findById(userid);
    return user;
};
const updateMe = async (userId, payload, file) => {
    if (file) {
        const response = await (0, sendImageToCloudinary_1.sendImageToCloudinary)(file?.originalname, file.path);
        const secureUrl = response.secureUrl;
        payload.photo = secureUrl || file?.path;
    }
    const user = await users_model_1.User.findByIdAndUpdate(userId, { payload });
    return user;
};
exports.usersServices = { getAllUsers, getMe, updateMe };
