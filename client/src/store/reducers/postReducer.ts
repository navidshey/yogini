import { ActionTypes, postState, ActionTypeKeys } from "../types";
import { initialPostState } from "./initialState";

const initialState: postState = initialPostState;

export default function(state = initialState, action: ActionTypes): postState {
  switch (action.type) {
    case ActionTypeKeys.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case ActionTypeKeys.POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case ActionTypeKeys.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case ActionTypeKeys.GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case ActionTypeKeys.DELETE_POST:
      return {
        ...state,
        posts:
          state.posts && state.posts.filter(post => post._id !== action.payload)
      };
    default:
      return state;
  }
}
