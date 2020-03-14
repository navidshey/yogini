"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EducationErrorMessages;
(function (EducationErrorMessages) {
    EducationErrorMessages["School_Required"] = "School field is required";
    EducationErrorMessages["Degree_Required"] = "degree field is required";
    EducationErrorMessages["Fieldofstudy_Required"] = "Field of study field is required";
    EducationErrorMessages["From_Required"] = "From date field is required";
})(EducationErrorMessages = exports.EducationErrorMessages || (exports.EducationErrorMessages = {}));
var ExperienceErrorMessages;
(function (ExperienceErrorMessages) {
    ExperienceErrorMessages["Title_Required"] = "Job title field is required";
    ExperienceErrorMessages["Company_Required"] = "company field is required";
    ExperienceErrorMessages["From_Required"] = "From date field is required";
})(ExperienceErrorMessages = exports.ExperienceErrorMessages || (exports.ExperienceErrorMessages = {}));
var LoginErrorMessages;
(function (LoginErrorMessages) {
    LoginErrorMessages["Email_Invalid"] = "Email is invalid";
    LoginErrorMessages["Email_Required"] = "Email field is required";
    LoginErrorMessages["Password_Required"] = "password field is required";
})(LoginErrorMessages = exports.LoginErrorMessages || (exports.LoginErrorMessages = {}));
var PostErrorMessages;
(function (PostErrorMessages) {
    PostErrorMessages["Text_Required"] = "Text field is required";
    PostErrorMessages["Text_Length"] = "Post must be between 10 t0 300 characters";
    PostErrorMessages["Name_Required"] = "name field is required";
    PostErrorMessages["Post_Not_Found"] = "Post not found";
    PostErrorMessages["Post_Not_Found_With_Id"] = "no post found with that id";
    PostErrorMessages["User_Already_Liked"] = "user already liked this post";
    PostErrorMessages["Not_Liked_Yet"] = "you have not yet liked this post";
    PostErrorMessages["Comment_Not_Exist"] = "comment does not exist";
})(PostErrorMessages = exports.PostErrorMessages || (exports.PostErrorMessages = {}));
var RegisterErrorMessages;
(function (RegisterErrorMessages) {
    RegisterErrorMessages["Name_Length"] = "Name must be between 2 and 30 characters";
    RegisterErrorMessages["Name_Required"] = "Name field is required";
    RegisterErrorMessages["Email_Invalid"] = "Email is invalid";
    RegisterErrorMessages["Email_Required"] = "Email field is required";
    RegisterErrorMessages["Password_Length"] = "Password must be between 6 and 30 characters";
    RegisterErrorMessages["Password_Required"] = "password field is required";
    RegisterErrorMessages["Password_Not_Matched"] = "passwords must match";
    RegisterErrorMessages["Confirm_Password_Required"] = "Confirm password field is required";
})(RegisterErrorMessages = exports.RegisterErrorMessages || (exports.RegisterErrorMessages = {}));
var ProfileErrorMessages;
(function (ProfileErrorMessages) {
    ProfileErrorMessages["Handle_Length"] = "Handle needs to be between 2 and 40 chars";
    ProfileErrorMessages["Handle_Required"] = "Profile handle is required";
    ProfileErrorMessages["Status_Required"] = "status field is required";
    ProfileErrorMessages["Skills_Required"] = "skills field is required";
    ProfileErrorMessages["Website_Invalid"] = "Not valid Url";
    ProfileErrorMessages["Youtube_Invalid"] = "Not valid Url";
    ProfileErrorMessages["Twitter_Invalid"] = "Not valid Url";
    ProfileErrorMessages["Facebook_Invalid"] = "Not valid Url";
    ProfileErrorMessages["Linkedin_Invalid"] = "Not valid Url";
    ProfileErrorMessages["Instagram_Invalid"] = "Not valid Url";
    ProfileErrorMessages["No_Profile"] = "there is no profile for the user";
    ProfileErrorMessages["No_Profiles"] = "there are no profiles";
    ProfileErrorMessages["Handle_Already_Exist"] = "that handle already exist";
})(ProfileErrorMessages = exports.ProfileErrorMessages || (exports.ProfileErrorMessages = {}));
var UserErrorMessage;
(function (UserErrorMessage) {
    UserErrorMessage["Not_Authorize"] = "user not authorize";
    UserErrorMessage["Already_Exist"] = "Email already exists";
    UserErrorMessage["Password_Incorrect"] = "password incorrect";
    UserErrorMessage["Not_Found"] = "user not found";
})(UserErrorMessage = exports.UserErrorMessage || (exports.UserErrorMessage = {}));
