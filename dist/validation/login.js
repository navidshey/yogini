"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/validatorjs/validator.js
const validator_1 = require("validator");
const is_empty_1 = require("./is-empty");
const errorMessages_1 = require("../config/errorMessages");
function validateLoginInput(data) {
    let errors = {};
    data.email = !is_empty_1.isEmpty(data.email) ? data.email : "";
    data.password = !is_empty_1.isEmpty(data.password) ? data.password : "";
    if (!validator_1.default.isEmail(data.email)) {
        errors.email = errorMessages_1.LoginErrorMessages.Email_Invalid;
    }
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = errorMessages_1.LoginErrorMessages.Email_Required;
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = errorMessages_1.LoginErrorMessages.Password_Required;
    }
    return {
        errors,
        isValid: is_empty_1.isEmpty(errors)
    };
}
exports.validateLoginInput = validateLoginInput;
