"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/validatorjs/validator.js
const Validator = require("validator");
const is_empty_1 = require("./is-empty");
const errorMessages_1 = require("../config/errorMessages");
exports.validateEducationInput = (data) => {
    let errors = {};
    data.school = !is_empty_1.isEmpty(data.school) ? data.school : "";
    data.degree = !is_empty_1.isEmpty(data.degree) ? data.degree : "";
    data.fieldofstudy = !is_empty_1.isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
    data.from = !is_empty_1.isEmpty(data.from) ? data.from : null;
    if (Validator.isEmpty(data.school)) {
        errors.school = errorMessages_1.EducationErrorMessages.School_Required;
    }
    if (Validator.isEmpty(data.degree)) {
        errors.degree = errorMessages_1.EducationErrorMessages.Degree_Required;
    }
    if (Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = errorMessages_1.EducationErrorMessages.Fieldofstudy_Required;
    }
    if (Validator.isEmpty(data.from)) {
        errors.from = errorMessages_1.EducationErrorMessages.From_Required;
    }
    return {
        errors,
        isValid: is_empty_1.isEmpty(errors)
    };
};
