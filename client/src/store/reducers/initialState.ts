import {
  postState,
  AuthState,
  IUser,
  IPost,
  IProfile,
  ISocial,
  profileState
} from "../types";

const initialUser: IUser = {
  id: "",
  avatar: "",
  date: "",
  email: "",
  exp: 0,
  name: "",
  password: ""
};

const initalPost: IPost = {
  _id: "",
  avatar: "",
  comments: [],
  date: "",
  likes: [],
  name: "",
  text: "",
  user: initialUser
};

const initialSocial: ISocial = {
  youtube: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  instagram: ""
};
export const initialProfile: IProfile = {
  _id: "",
  user: initialUser,
  handle: "",
  company: "",
  website: "",
  location: "",
  status: "",
  skills: [],
  bio: "",
  githubusername: "",
  experience: [],
  education: [],
  social: initialSocial
};
export const initialAuthState: AuthState = {
  isAuthenticatd: false,
  user: initialUser
};

export const initialPostState: postState = {
  posts: [],
  post: initalPost,
  loading: false
};

export const initialProfileState: profileState = {
  profile: initialProfile,
  profiles: [],
  loading: false
};
export const initialErrorState = {};
