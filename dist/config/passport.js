"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Document: https://github.com/mikenicholson/passport-jwt
const JwtStategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const keys_1 = require("./keys");
class PassportInit {
    constructor() {
        this.opts = {};
        this.opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        this.opts.secretOrKey = keys_1.default.secretOrKey;
    }
    Initialize(passport) {
        passport.use(new JwtStategy(this.opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
                .catch(er => console.log(er));
        }));
    }
}
exports.default = PassportInit;
