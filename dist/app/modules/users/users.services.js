"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersServices = void 0;
const sendFileToCloudinary_1 = require("../../utils/sendFileToCloudinary");
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
    let photo = null;
    if (file) {
        const response = await (0, sendFileToCloudinary_1.sendFileToCloudinary)(file?.originalname, file.path);
        const secureUrl = response.secure_url;
        photo = secureUrl || file?.path;
    }
    const user = await users_model_1.User.findByIdAndUpdate(userId, { ...payload, photo: photo }, { new: true, runValidators: true });
    return user;
};
exports.usersServices = { getAllUsers, getMe, updateMe };
