// https://github.com/validatorjs/validator.js
import Validator from "validator";
import { isEmpty } from "./is-empty";
import { IPost, IpostErrors } from "../models/Post";
import { PostErrorMessages } from "../config/errorMessages";

export const validatePostInput = (data: IPost) => {
  let errors: IpostErrors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  data.name = !isEmpty(data.name) ? data.name : "";

  if (Validator.isEmpty(data.text)) {
    errors.text = PostErrorMessages.Text_Required;
  }

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = PostErrorMessages.Text_Length;
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = PostErrorMessages.Name_Required;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
