// https://github.com/validatorjs/validator.js
import * as Validator from "validator";
import { isEmpty } from "./is-empty";

interface loginErrors {
  email?: string;
  password?: string;
}

export function validateLoginInput(data) {
  let errors: loginErrors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
