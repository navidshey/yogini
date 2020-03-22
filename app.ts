import * as express from "express";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as mongoose from "mongoose";
import UsersApi from "./routes/api/users";
import postsApi from "./routes/api/posts";
import profileApi from "./routes/api/profile";
import keys from "./config/keys";
import PassportInit from "./config/passport";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.generateRoutes();
  }

  private config(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.configDb();
    this.app.use(passport.initialize());
    new PassportInit().Initialize(passport);
  }

  private configDb(): void {
    const db = keys.mongoURI;
    mongoose
      .connect(db)
      .then(() => console.log("MongoDB Connected"))
      .catch(err => console.log(err));
  }

  private generateRoutes() {
    this.app.use("/api/users", new UsersApi().routes());
    this.app.use("/api/posts", new postsApi().routes());
    this.app.use("/api/profile", new profileApi().routes());
  }
}

export default new App().app;
