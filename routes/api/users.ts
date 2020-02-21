import { Request, Response, NextFunction } from "express";
import * as express from "express";

// const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// load input validation
import { validateRegisterInput } from "./../../validation/register";
import { validateLoginInput } from "./../../validation/login";

//Load user model
import { User, IUser } from "../../models/User";

// @route   Get api/users/test
// @test    Test users route
// @access  public
router.get("/test", (req: Request, res: Response) =>
  res.json({ msg: "users works" })
);

// @route   Post api/users/register
// @test    register user
// @access  public
router.post("/register", (req: Request, res: Response) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }, (err: any, user: IUser) => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json({ errors });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(er => console.log(err));
        });
      });
    }
  });
});

// @route   Post api/users/login
// @test    Login user / returing JWT token
// @access  public
router.post("/login", (req: Request, res: Response) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }, (err: any, user: IUser) => {
    // check for user
    if (!user) {
      errors.email = "user not found";
      return res.status(404).json(errors);
    }

    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user matched

        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // create JWT payload

        // sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.passport = "passowrd incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   Post api/users/current
// @test    return current user
// @access  private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req: any, res: Response) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;