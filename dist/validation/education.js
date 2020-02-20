"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/validatorjs/validator.js
const Validator = require("validator");
const is_empty_1 = require("./is-empty");
function validateEducationInput(data) {
    let errors = {};
    data.school = !is_empty_1.isEmpty(data.school) ? data.school : "";
    data.degree = !is_empty_1.isEmpty(data.degree) ? data.degree : "";
    data.fieldofstudy = !is_empty_1.isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
    data.from = !is_empty_1.isEmpty(data.from) ? data.from : "";
    if (Validator.isEmpty(data.school)) {
        errors.school = "School field is required";
    }
    if (Validator.isEmpty(data.degree)) {
        errors.degree = "degree field is required";
    }
    if (Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = "Field of study field is required";
    }
    if (Validator.isEmpty(data.from)) {
        errors.from = "From date field is required";
    }
    return {
        errors,
        isValid: is_empty_1.isEmpty(errors)
    };
}
exports.validateEducationInput = validateEducationInput;
