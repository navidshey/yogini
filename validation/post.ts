// https://github.com/validatorjs/validator.js
import * as Validator from "validator";
import { isEmpty } from "./is-empty";

export function validatePostInput(data) {
  let errors: any = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  data.name = !isEmpty(data.name) ? data.name : "";

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
    isValid: isEmpty(errors)
  };
}
