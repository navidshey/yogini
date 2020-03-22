import * as express from "express";
import ProfileController from "../controllers/profile";

export default class profileApi {
  private profileController: ProfileController = new ProfileController();
  private router = express.Router();
  private passport = require("passport");

  public routes() {
    this.router.get(
      "/",
      this.passport.authenticate("jwt", { session: false }),
      (req, res) => {
        this.profileController.getCurrentUser(req, res);
      }
    );

    this.router.get("/all", (req, res) => {
      this.profileController.getAll(req, res);
    });

    this.router.get("/handle/:handle", (req, res) => {
      this.profileController.getByHandle(req, res);
    });

    this.router.get("/user/:user_id", (req, res) => {
      this.profileController.getByUserId(req, res);
    });

    this.router.post(
      "/",
      this.passport.authenticate("jwt", { session: false }),
      (req, res) => {
        this.profileController.createOrEdit(req, res);
      }
    );

    this.router.post(
      "/experience",
      this.passport.authenticate("jwt", { session: false }),
      (req, res) => {
        this.profileController.addExperience(req, res);
      }
    );

    this.router.post(
      "/education",
      this.passport.authenticate("jwt", { session: false }),
      (req, res) => {
        this.profileController.addEducation(req, res);
      }
    );

    this.router.delete(
      "/experience/:exp_id",
      this.passport.authenticate("jwt", { session: false }),
      (req, res) => {
        this.profileController.deleteExperience(req, res);
      }
    );

    this.router.delete(
      "/education/:edu_id",
      this.passport.authenticate("jwt", { session: false }),
      (req, res) => {
        this.profileController.deleteEducation(req, res);
      }
    );

    this.router.delete(
      "/",
      this.passport.authenticate("jwt", { session: false }),
      (req, res) => {
        this.profileController.delete(req, res);
      }
    );
    return this.router;
  }
}
