"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/validatorjs/validator.js
const validator_1 = require("validator");
const is_empty_1 = require("./is-empty");
const errorMessages_1 = require("../config/errorMessages");
exports.validateEducationInput = (data) => {
    let errors = {};
    data.school = !is_empty_1.isEmpty(data.school) ? data.school : "";
    data.degree = !is_empty_1.isEmpty(data.degree) ? data.degree : "";
    data.fieldofstudy = !is_empty_1.isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
    data.from = !is_empty_1.isEmpty(data.from) ? data.from : null;
    if (validator_1.default.isEmpty(data.school)) {
        errors.school = errorMessages_1.EducationErrorMessages.School_Required;
    }
    if (validator_1.default.isEmpty(data.degree)) {
        errors.degree = errorMessages_1.EducationErrorMessages.Degree_Required;
    }
    if (validator_1.default.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = errorMessages_1.EducationErrorMessages.Fieldofstudy_Required;
    }
    if (validator_1.default.isEmpty(data.from.toString())) {
        errors.from = errorMessages_1.EducationErrorMessages.From_Required;
    }
    return {
        errors,
        isValid: is_empty_1.isEmpty(errors)
    };
};
