// https://github.com/validatorjs/validator.js
import * as Validator from "validator";
import { isEmpty } from "./is-empty";
import { IEducation, IEducationErrors } from "../models/IEducation";
import { EducationErrorMessages } from "../config/errorMessages";

export const validateEducationInput = (data: IEducation) => {
  let errors: IEducationErrors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : null;

  if (Validator.isEmpty(data.school)) {
    errors.school = EducationErrorMessages.School_Required;
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = EducationErrorMessages.Degree_Required;
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = EducationErrorMessages.Fieldofstudy_Required;
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = EducationErrorMessages.From_Required;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
