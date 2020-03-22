"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const users_1 = require("./routes/api/users");
const posts_1 = require("./routes/api/posts");
const profile_1 = require("./routes/api/profile");
const keys_1 = require("./config/keys");
const passport_1 = require("./config/passport");
class App {
    constructor() {
        this.app = express();
        this.config();
        this.generateRoutes();
    }
    config() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.configDb();
        this.app.use(passport.initialize());
        new passport_1.default().Initialize(passport);
    }
    configDb() {
        const db = keys_1.default.mongoURI;
        mongoose
            .connect(db)
            .then(() => console.log("MongoDB Connected"))
            .catch(err => console.log(err));
    }
    generateRoutes() {
        this.app.use("/api/users", new users_1.default().routes());
        this.app.use("/api/posts", new posts_1.default().routes());
        this.app.use("/api/profile", new profile_1.default().routes());
    }
}
exports.default = new App().app;
