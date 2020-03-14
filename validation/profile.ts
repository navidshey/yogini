// https://github.com/validatorjs/validator.js
import * as Validator from "validator";
import { isEmpty } from "./is-empty";
import { IProfile, IProfileErrors } from "../models/Profile";
import { ProfileErrorMessages } from "../config/errorMessages";

export function validateProfileInput(data: IProfile | any) {
  let errors: IProfileErrors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = ProfileErrorMessages.Handle_Length;
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = ProfileErrorMessages.Handle_Required;
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = ProfileErrorMessages.Status_Required;
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = ProfileErrorMessages.Skills_Required;
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = ProfileErrorMessages.Website_Invalid;
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = ProfileErrorMessages.Youtube_Invalid;
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = ProfileErrorMessages.Twitter_Invalid;
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = ProfileErrorMessages.Facebook_Invalid;
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = ProfileErrorMessages.Linkedin_Invalid;
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = ProfileErrorMessages.Instagram_Invalid;
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
