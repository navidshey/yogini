"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/validatorjs/validator.js
const Validator = require("validator");
const is_empty_1 = require("./is-empty");
function validateExperienceInput(data) {
    let errors = {};
    data.title = !is_empty_1.isEmpty(data.title) ? data.title : "";
    data.company = !is_empty_1.isEmpty(data.company) ? data.company : "";
    data.from = !is_empty_1.isEmpty(data.from) ? data.from : "";
    if (Validator.isEmpty(data.title)) {
        errors.title = "Job title field is required";
    }
    if (Validator.isEmpty(data.company)) {
        errors.company = "company field is required";
    }
    if (Validator.isEmpty(data.from)) {
        errors.from = "From date field is required";
    }
    return {
        errors,
        isValid: is_empty_1.isEmpty(errors)
    };
}
exports.validateExperienceInput = validateExperienceInput;
