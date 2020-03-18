import { ActionTypes, postState, ActionTypeKeys, IPost } from "../types";
import { initialPostState } from "./initialState";
import produce from "immer";

const initialState: postState = initialPostState;

export default (state = initialState, action: ActionTypes) => {
  return produce(state, (draft: postState): any => {
    switch (action.type) {
      case ActionTypeKeys.ADD_POST:
        draft.posts = [action.payload, ...draft.posts];
        break;
      case ActionTypeKeys.POST_LOADING:
        draft.loading = true;
        break;
      case ActionTypeKeys.GET_POSTS:
        draft.posts = action.payload;
        draft.loading = false;
        break;
      case ActionTypeKeys.POST_LIKED:
        draft.posts = substitudePost(draft.posts, action.payload);
        draft.loading = false;
        break;
      case ActionTypeKeys.GET_POST:
        draft.post = action.payload;
        draft.loading = false;
        break;
      case ActionTypeKeys.DELETE_POST:
        draft.posts =
          draft.posts &&
          draft.posts.filter(post => post._id !== action.payload);
        break;
      default:
        return state;
    }
  });
};

// export default function(state = initialState, action: ActionTypes): postState {
//   switch (action.type) {
//     case ActionTypeKeys.ADD_POST:
//       return {
//         ...state,
//         posts: [action.payload, ...state.posts]
//       };
//     case ActionTypeKeys.POST_LOADING:
//       return {
//         ...state,
//         loading: true
//       };
//     case ActionTypeKeys.GET_POSTS:
//       return {
//         ...state,
//         posts: action.payload,
//         loading: false
//       };
//     // case ActionTypeKeys.POST_LIKED:
//     //   return {
//     //     ...state,
//     //     posts: substitudePost(state.posts, action.payload),
//     //     loading: false
//     //   };
//     case ActionTypeKeys.POST_LIKED:
//       produce((draft, action) => {
//         draft.posts.forEach((element: IPost) => {
//           if (element._id === action.payload._id)
//             element.likes = action.payload.likes;
//         });
//       });
//     case ActionTypeKeys.GET_POST:
//       return {
//         ...state,
//         post: action.payload,
//         loading: false
//       };
//     case ActionTypeKeys.DELETE_POST:
//       return {
//         ...state,
//         posts:
//           state.posts && state.posts.filter(post => post._id !== action.payload)
//       };
//     default:
//       return state;
//   }
// }

const substitudePost = (posts: IPost[], post: IPost): IPost[] => {
  const index = posts.findIndex(i => i._id == post._id);
  if (index > -1) posts[index] = post;
  return posts;

  // return posts.map((item, i) => {
  //   if (i === index) {
  //     return {
  //       ...post
  //     };
  //   } else return item;
  // });

  // return posts;
};
