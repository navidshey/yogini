import * as express from "express";
import * as passport from "passport";
import UsersController from "../controllers/users";

export default class UsersApi {
  private usersController: UsersController = new UsersController();
  private router = express.Router();

  public routes() {
    this.router.post("/register", (req, res) => {
      this.usersController.register(req, res);
    });

    this.router.post("/login", (req, res) => {
      this.usersController.login(req, res);
    });

    this.router.get(
      "/current",
      passport.authenticate("jwt", { session: false }),
      (req, res) => {
        this.usersController.getCurrent(req, res);
      }
    );

    return this.router;
  }
}
