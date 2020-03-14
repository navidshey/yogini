"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/Validatorjs/Validator.js
const Validator = require("Validator");
const is_empty_1 = require("./is-empty");
const errorMessages_1 = require("../config/errorMessages");
function validateRegisterInput(data) {
    let errors = {};
    data.name = !is_empty_1.isEmpty(data.name) ? data.name : "";
    data.email = !is_empty_1.isEmpty(data.email) ? data.email : "";
    data.password = !is_empty_1.isEmpty(data.password) ? data.password : "";
    data.password2 = !is_empty_1.isEmpty(data.password2) ? data.password2 : "";
    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = errorMessages_1.RegisterErrorMessages.Name_Length;
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = errorMessages_1.RegisterErrorMessages.Name_Required;
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = errorMessages_1.RegisterErrorMessages.Email_Invalid;
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = errorMessages_1.RegisterErrorMessages.Email_Required;
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = errorMessages_1.RegisterErrorMessages.Password_Length;
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = errorMessages_1.RegisterErrorMessages.Password_Required;
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = errorMessages_1.RegisterErrorMessages.Password_Not_Matched;
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = errorMessages_1.RegisterErrorMessages.Confirm_Password_Required;
    }
    return {
        errors,
        isValid: is_empty_1.isEmpty(errors)
    };
}
exports.validateRegisterInput = validateRegisterInput;
