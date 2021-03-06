"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/validatorjs/validator.js
const validator_1 = require("validator");
const is_empty_1 = require("./is-empty");
const errorMessages_1 = require("../config/errorMessages");
exports.validateExperienceInput = (data) => {
    let errors = {};
    data.title = !is_empty_1.isEmpty(data.title) ? data.title : "";
    data.company = !is_empty_1.isEmpty(data.company) ? data.company : "";
    data.from = !is_empty_1.isEmpty(data.from) ? data.from : null;
    if (validator_1.default.isEmpty(data.title)) {
        errors.title = errorMessages_1.ExperienceErrorMessages.Title_Required;
    }
    if (validator_1.default.isEmpty(data.company)) {
        errors.company = errorMessages_1.ExperienceErrorMessages.Company_Required;
    }
    if (validator_1.default.isEmpty(data.from.toString())) {
        errors.from = errorMessages_1.ExperienceErrorMessages.From_Required;
    }
    return {
        errors,
        isValid: is_empty_1.isEmpty(errors)
    };
};
