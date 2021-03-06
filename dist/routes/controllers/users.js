"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys_1 = require("../../config/keys");
const register_1 = require("./../../validation/register");
const login_1 = require("./../../validation/login");
const User_1 = require("../../models/User");
const errorMessages_1 = require("../../config/errorMessages");
class usersController {
    register(req, res) {
        const { errors, isValid } = register_1.validateRegisterInput(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        User_1.User.findOne({ email: req.body.email }, (err, user) => {
            if (user) {
                errors.email = errorMessages_1.UserErrorMessage.Already_Exist;
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
    }
    login(req, res) {
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
                errors.email = errorMessages_1.UserErrorMessage.Not_Found;
                return res.status(404).json(errors);
            }
            //check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    // user matched
                    const payload = { id: user.id, name: user.name, avatar: user.avatar }; // create JWT payload
                    // sign token
                    jwt.sign(payload, keys_1.default.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    });
                }
                else {
                    errors.password = errorMessages_1.UserErrorMessage.Password_Incorrect;
                    return res.status(400).json(errors);
                }
            });
        });
    }
    getCurrent(req, res) {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    }
}
exports.default = usersController;
