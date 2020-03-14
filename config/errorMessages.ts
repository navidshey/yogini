export enum EducationErrorMessages {
  School_Required = "School field is required",
  Degree_Required = "degree field is required",
  Fieldofstudy_Required = "Field of study field is required",
  From_Required = "From date field is required"
}

export enum ExperienceErrorMessages {
  Title_Required = "Job title field is required",
  Company_Required = "company field is required",
  From_Required = "From date field is required"
}

export enum LoginErrorMessages {
  Email_Invalid = "Email is invalid",
  Email_Required = "Email field is required",
  Password_Required = "password field is required"
}

export enum PostErrorMessages {
  Text_Required = "Text field is required",
  Text_Length = "Post must be between 10 t0 300 characters",
  Name_Required = "name field is required",
  Post_Not_Found = "Post not found",
  Post_Not_Found_With_Id = "no post found with that id",
  User_Already_Liked = "user already liked this post",
  Not_Liked_Yet = "you have not yet liked this post",
  Comment_Not_Exist = "comment does not exist"
}

export enum RegisterErrorMessages {
  Name_Length = "Name must be between 2 and 30 characters",
  Name_Required = "Name field is required",
  Email_Invalid = "Email is invalid",
  Email_Required = "Email field is required",
  Password_Length = "Password must be between 6 and 30 characters",
  Password_Required = "password field is required",
  Password_Not_Matched = "passwords must match",
  Confirm_Password_Required = "Confirm password field is required"
}

export enum ProfileErrorMessages {
  Handle_Length = "Handle needs to be between 2 and 40 chars",
  Handle_Required = "Profile handle is required",
  Status_Required = "status field is required",
  Skills_Required = "skills field is required",
  Website_Invalid = "Not valid Url",
  Youtube_Invalid = "Not valid Url",
  Twitter_Invalid = "Not valid Url",
  Facebook_Invalid = "Not valid Url",
  Linkedin_Invalid = "Not valid Url",
  Instagram_Invalid = "Not valid Url",
  No_Profile = "there is no profile for the user",
  No_Profiles = "there are no profiles",
  Handle_Already_Exist = "that handle already exist"
}

export enum UserErrorMessage {
  Not_Authorize = "user not authorize",
  Already_Exist = "Email already exists",
  Password_Incorrect = "password incorrect",
  Not_Found = "user not found"
}
