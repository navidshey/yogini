// https://github.com/Validatorjs/Validator.js
import Validator from "Validator";
import { isEmpty } from "./is-empty";
import { IRegister, IRegisterErrors } from "../models/IRegister";
import { RegisterErrorMessages } from "../config/errorMessages";

export function validateRegisterInput(data: IRegister) {
  let errors: IRegisterErrors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = RegisterErrorMessages.Name_Length;
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = RegisterErrorMessages.Name_Required;
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = RegisterErrorMessages.Email_Invalid;
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = RegisterErrorMessages.Email_Required;
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = RegisterErrorMessages.Password_Length;
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = RegisterErrorMessages.Password_Required;
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = RegisterErrorMessages.Password_Not_Matched;
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = RegisterErrorMessages.Confirm_Password_Required;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
