//Document: https://github.com/mikenicholson/passport-jwt
const JwtStategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
import * as mongoose from "mongoose";
const User = mongoose.model("User");
import keys from "./keys";

export default class PassportInit {
  private opts: any = {};
  constructor() {
    this.opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    this.opts.secretOrKey = keys.secretOrKey;
  }

  public Initialize(passport) {
    passport.use(
      new JwtStategy(this.opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
          .then(user => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(er => console.log(er));
      })
    );
  }
}
