"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
var express_1 = require("express");
var users_1 = require("./api/users");
var appRouter = (0, express_1.Router)();
exports.appRouter = appRouter;
appRouter.use("/users", users_1.default);
exports.default = appRouter;
