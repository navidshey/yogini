"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/Validatorjs/Validator.js
const Validator = require("Validator");
const is_empty_1 = require("./is-empty");
function validateRegisterInput(data) {
    let errors = {};
    data.name = !is_empty_1.isEmpty(data.name) ? data.name : "";
    data.email = !is_empty_1.isEmpty(data.email) ? data.email : "";
    data.password = !is_empty_1.isEmpty(data.password) ? data.password : "";
    data.password2 = !is_empty_1.isEmpty(data.password2) ? data.password2 : "";
    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = "Name must be between 2 and 30 characters";
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be between 6 and 30 characters";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "password field is required";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "passwords must match";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }
    return {
        errors,
        isValid: is_empty_1.isEmpty(errors)
    };
}
exports.validateRegisterInput = validateRegisterInput;
