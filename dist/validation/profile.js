"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/validatorjs/validator.js
const validator_1 = require("validator");
const is_empty_1 = require("./is-empty");
const errorMessages_1 = require("../config/errorMessages");
function validateProfileInput(data) {
    let errors = {};
    data.handle = !is_empty_1.isEmpty(data.handle) ? data.handle : "";
    data.status = !is_empty_1.isEmpty(data.status) ? data.status : "";
    data.skills = !is_empty_1.isEmpty(data.skills) ? data.skills : "";
    if (!validator_1.default.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = errorMessages_1.ProfileErrorMessages.Handle_Length;
    }
    if (validator_1.default.isEmpty(data.handle)) {
        errors.handle = errorMessages_1.ProfileErrorMessages.Handle_Required;
    }
    if (validator_1.default.isEmpty(data.status)) {
        errors.status = errorMessages_1.ProfileErrorMessages.Status_Required;
    }
    if (validator_1.default.isEmpty(data.skills)) {
        errors.skills = errorMessages_1.ProfileErrorMessages.Skills_Required;
    }
    if (!is_empty_1.isEmpty(data.website)) {
        if (!validator_1.default.isURL(data.website)) {
            errors.website = errorMessages_1.ProfileErrorMessages.Website_Invalid;
        }
    }
    if (!is_empty_1.isEmpty(data.youtube)) {
        if (!validator_1.default.isURL(data.youtube)) {
            errors.youtube = errorMessages_1.ProfileErrorMessages.Youtube_Invalid;
        }
    }
    if (!is_empty_1.isEmpty(data.twitter)) {
        if (!validator_1.default.isURL(data.twitter)) {
            errors.twitter = errorMessages_1.ProfileErrorMessages.Twitter_Invalid;
        }
    }
    if (!is_empty_1.isEmpty(data.facebook)) {
        if (!validator_1.default.isURL(data.facebook)) {
            errors.facebook = errorMessages_1.ProfileErrorMessages.Facebook_Invalid;
        }
    }
    if (!is_empty_1.isEmpty(data.linkedin)) {
        if (!validator_1.default.isURL(data.linkedin)) {
            errors.linkedin = errorMessages_1.ProfileErrorMessages.Linkedin_Invalid;
        }
    }
    if (!is_empty_1.isEmpty(data.instagram)) {
        if (!validator_1.default.isURL(data.instagram)) {
            errors.instagram = errorMessages_1.ProfileErrorMessages.Instagram_Invalid;
        }
    }
    return {
        errors,
        isValid: is_empty_1.isEmpty(errors)
    };
}
exports.validateProfileInput = validateProfileInput;
