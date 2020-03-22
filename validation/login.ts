// https://github.com/validatorjs/validator.js
import Validator from "validator";
import { isEmpty } from "./is-empty";
import { ILogin, ILoginErrors } from "../models/ILogin";
import { LoginErrorMessages } from "../config/errorMessages";

export function validateLoginInput(data: ILogin) {
  let errors: ILoginErrors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = LoginErrorMessages.Email_Invalid;
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = LoginErrorMessages.Email_Required;
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = LoginErrorMessages.Password_Required;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
