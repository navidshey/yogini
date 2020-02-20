"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/validatorjs/validator.js
const Validator = require("validator");
const is_empty_1 = require("./is-empty");
function validateLoginInput(data) {
    let errors = {};
    data.email = !is_empty_1.isEmpty(data.email) ? data.email : "";
    data.password = !is_empty_1.isEmpty(data.password) ? data.password : "";
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "password field is required";
    }
    return {
        errors,
        isValid: is_empty_1.isEmpty(errors)
    };
}
exports.validateLoginInput = validateLoginInput;
