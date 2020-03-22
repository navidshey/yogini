"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const profile_1 = require("../controllers/profile");
class profileApi {
    constructor() {
        this.profileController = new profile_1.default();
        this.router = express.Router();
        this.passport = require("passport");
    }
    routes() {
        this.router.get("/", this.passport.authenticate("jwt", { session: false }), (req, res) => {
            this.profileController.getCurrentUser(req, res);
        });
        this.router.get("/all", (req, res) => {
            this.profileController.getAll(req, res);
        });
        this.router.get("/handle/:handle", (req, res) => {
            this.profileController.getByHandle(req, res);
        });
        this.router.get("/user/:user_id", (req, res) => {
            this.profileController.getByUserId(req, res);
        });
        this.router.post("/", this.passport.authenticate("jwt", { session: false }), (req, res) => {
            this.profileController.createOrEdit(req, res);
        });
        this.router.post("/experience", this.passport.authenticate("jwt", { session: false }), (req, res) => {
            this.profileController.addExperience(req, res);
        });
        this.router.post("/education", this.passport.authenticate("jwt", { session: false }), (req, res) => {
            this.profileController.addEducation(req, res);
        });
        this.router.delete("/experience/:exp_id", this.passport.authenticate("jwt", { session: false }), (req, res) => {
            this.profileController.deleteExperience(req, res);
        });
        this.router.delete("/education/:edu_id", this.passport.authenticate("jwt", { session: false }), (req, res) => {
            this.profileController.deleteEducation(req, res);
        });
        this.router.delete("/", this.passport.authenticate("jwt", { session: false }), (req, res) => {
            this.profileController.delete(req, res);
        });
        return this.router;
    }
}
exports.default = profileApi;
