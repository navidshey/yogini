"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/validatorjs/validator.js
const Validator = require("validator");
const is_empty_1 = require("./is-empty");
const errorMessages_1 = require("../config/errorMessages");
function validateProfileInput(data) {
    let errors = {};
    data.handle = !is_empty_1.isEmpty(data.handle) ? data.handle : "";
    data.status = !is_empty_1.isEmpty(data.status) ? data.status : "";
    data.skills = !is_empty_1.isEmpty(data.skills) ? data.skills : "";
    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = errorMessages_1.ProfileErrorMessages.Handle_Length;
    }
    if (Validator.isEmpty(data.handle)) {
        errors.handle = errorMessages_1.ProfileErrorMessages.Handle_Required;
    }
    if (Validator.isEmpty(data.status)) {
        errors.status = errorMessages_1.ProfileErrorMessages.Status_Required;
    }
    if (Validator.isEmpty(data.skills)) {
        errors.skills = errorMessages_1.ProfileErrorMessages.Skills_Required;
    }
    if (!is_empty_1.isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = errorMessages_1.ProfileErrorMessages.Website_Invalid;
        }
    }
    if (!is_empty_1.isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = errorMessages_1.ProfileErrorMessages.Youtube_Invalid;
        }
    }
    if (!is_empty_1.isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = errorMessages_1.ProfileErrorMessages.Twitter_Invalid;
        }
    }
    if (!is_empty_1.isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = errorMessages_1.ProfileErrorMessages.Facebook_Invalid;
        }
    }
    if (!is_empty_1.isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = errorMessages_1.ProfileErrorMessages.Linkedin_Invalid;
        }
    }
    if (!is_empty_1.isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = errorMessages_1.ProfileErrorMessages.Instagram_Invalid;
        }
    }
    return {
        errors,
        isValid: is_empty_1.isEmpty(errors)
    };
}
exports.validateProfileInput = validateProfileInput;
