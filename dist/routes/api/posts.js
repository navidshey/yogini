"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const posts_1 = require("../controllers/posts");
class postsApi {
    constructor() {
        this.postsController = new posts_1.default();
        this.router = express.Router();
        this.passport = require("passport");
    }
    routes() {
        this.router
            .get("/", (req, res) => {
            this.postsController.get(req, res);
        })
            .post("/", this.passport.authenticate("jwt", { session: false }), (req, res) => {
            this.postsController.create(req, res);
        });
        this.router
            .get("/:id", (req, res) => {
            this.postsController.getById(req, res);
        })
            .delete("/:id", this.passport.authenticate("jwt", { session: false }), (req, res) => {
            this.postsController.delete(req, res);
        });
        this.router.post("/like/:id", this.passport.authenticate("jwt", { session: false }), (req, res) => {
            this.postsController.likePost(req, res);
        });
        this.router.post("/unlike/:id", this.passport.authenticate("jwt", { session: false }), (req, res) => {
            this.postsController.unlikePost(req, res);
        });
        this.router.post("/comment/:id", this.passport.authenticate("jwt", { session: false }), (req, res) => {
            this.postsController.addComment(req, res);
        });
        this.router.delete("/comment/:id/:comment_id", this.passport.authenticate("jwt", { session: false }), (req, res) => {
            this.postsController.removeComment(req, res);
        });
        return this.router;
    }
}
exports.default = postsApi;
