"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/validatorjs/validator.js
const Validator = require("validator");
const is_empty_1 = require("./is-empty");
function validatePostInput(data) {
    let errors = {};
    data.text = !is_empty_1.isEmpty(data.text) ? data.text : "";
    data.name = !is_empty_1.isEmpty(data.name) ? data.name : "";
    if (Validator.isEmpty(data.text)) {
        errors.text = "Text field is required";
    }
    if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = "Post must be between 10 t0 300 characters";
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = "name field is required";
    }
    return {
        errors,
        isValid: is_empty_1.isEmpty(errors)
    };
}
exports.validatePostInput = validatePostInput;
