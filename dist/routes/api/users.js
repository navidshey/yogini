"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const users_1 = require("../controllers/users");
class UsersApi {
    constructor() {
        this.usersController = new users_1.default();
        this.router = express.Router();
    }
    routes() {
        this.router.post("/register", (req, res) => {
            this.usersController.register(req, res);
        });
        this.router.post("/login", (req, res) => {
            this.usersController.login(req, res);
        });
        this.router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
            this.usersController.getCurrent(req, res);
        });
        return this.router;
    }
}
exports.default = UsersApi;
