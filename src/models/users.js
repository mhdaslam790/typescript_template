"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
    },
    email: {
        type: String,
        lowarcase: true,
        unique: true,
        required: [true, 'Please enter an email'],
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });
var UserModel = mongoose_1.default.model('user', UserSchema);
exports.UserModel = UserModel;
exports.default = UserModel;
