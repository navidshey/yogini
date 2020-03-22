// https://github.com/validatorjs/validator.js
import Validator from "validator";
import { isEmpty } from "./is-empty";
import { IExperience, IExperienceErrors } from "../models/IExperience";
import { ExperienceErrorMessages } from "../config/errorMessages";

export const validateExperienceInput = (data: IExperience) => {
  let errors: IExperienceErrors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : null;

  if (Validator.isEmpty(data.title)) {
    errors.title = ExperienceErrorMessages.Title_Required;
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = ExperienceErrorMessages.Company_Required;
  }

  if (Validator.isEmpty(data.from.toString())) {
    errors.from = ExperienceErrorMessages.From_Required;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
