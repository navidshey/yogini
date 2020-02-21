"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/validatorjs/validator.js
const Validator = require("validator");
const is_empty_1 = require("./is-empty");
function validateProfileInput(data) {
    let errors = {};
    data.handle = !is_empty_1.isEmpty(data.handle) ? data.handle : "";
    data.status = !is_empty_1.isEmpty(data.status) ? data.status : "";
    data.skills = !is_empty_1.isEmpty(data.skills) ? data.skills : "";
    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = "Handle needs to be between 2 and 40 chars";
    }
    if (Validator.isEmpty(data.handle)) {
        errors.handle = "Profile handle is required";
    }
    if (Validator.isEmpty(data.status)) {
        errors.status = "status field is required";
    }
    if (Validator.isEmpty(data.skills)) {
        errors.skills = "skills field is required";
    }
    if (!is_empty_1.isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = "Not valid Url";
        }
    }
    if (!is_empty_1.isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = "Not valid Url";
        }
    }
    if (!is_empty_1.isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = "Not valid Url";
        }
    }
    if (!is_empty_1.isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = "Not valid Url";
        }
    }
    if (!is_empty_1.isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = "Not valid Url";
        }
    }
    if (!is_empty_1.isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = "Not valid Url";
        }
    }
    return {
        errors,
        isValid: is_empty_1.isEmpty(errors)
    };
}
exports.validateProfileInput = validateProfileInput;