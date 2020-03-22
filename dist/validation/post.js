"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/validatorjs/validator.js
const validator_1 = require("validator");
const is_empty_1 = require("./is-empty");
const errorMessages_1 = require("../config/errorMessages");
exports.validatePostInput = (data) => {
    let errors = {};
    data.text = !is_empty_1.isEmpty(data.text) ? data.text : "";
    data.name = !is_empty_1.isEmpty(data.name) ? data.name : "";
    if (validator_1.default.isEmpty(data.text)) {
        errors.text = errorMessages_1.PostErrorMessages.Text_Required;
    }
    if (!validator_1.default.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = errorMessages_1.PostErrorMessages.Text_Length;
    }
    if (validator_1.default.isEmpty(data.name)) {
        errors.name = errorMessages_1.PostErrorMessages.Name_Required;
    }
    return {
        errors,
        isValid: is_empty_1.isEmpty(errors)
    };
};
