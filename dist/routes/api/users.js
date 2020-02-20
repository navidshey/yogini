"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
// const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// load input validation
const register_1 = require("./../../validation/register");
const login_1 = require("./../../validation/login");
//Load user model
const User_1 = require("../../models/User");
// @route   Get api/users/test
// @test    Test users route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "users works" }));
// @route   Post api/users/register
// @test    register user
// @access  public
router.post("/register", (req, res) => {
    const { errors, isValid } = register_1.validateRegisterInput(req.body);
    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User_1.User.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            errors.email = "Email already exists";
            return res.status(400).json({ errors });
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s: "200",
                r: "pg",
                d: "mm" //Default
            });
            const newUser = new User_1.User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err)
                        throw err;
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
router.post("/login", (req, res) => {
    const { errors, isValid } = login_1.validateLoginInput(req.body);
    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    //Find user by email
    User_1.User.findOne({ email }, (err, user) => {
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
                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                });
            }
            else {
                errors.passport = "passowrd incorrect";
                return res.status(400).json(errors);
            }
        });
    });
});
// @route   Post api/users/current
// @test    return current user
// @access  private
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});
module.exports = router;
