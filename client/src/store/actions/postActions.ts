import axios from "axios";
import {
  ActionTypeKeys,
  ActionTypes,
  IPostCreate,
  ICommentCreate
} from "./../types";
import { ApiRoutes } from "../../constants";
import { Dispatch } from "react";

export const addPost = (postData: IPostCreate) => (
  dispatch: Dispatch<ActionTypes>
) => {
  // dispatch(clearErrors());
  axios
    .post(ApiRoutes.POST, postData)
    .then(res =>
      dispatch({
        type: ActionTypeKeys.ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ActionTypeKeys.GET_ERRORS,
        payload: err.response && err.response.data ? err.response.data : null
      })
    );
};

export const getPosts = () => (dispatch: Dispatch<ActionTypes>) => {
  dispatch(setPostLoading());
  axios
    .get(ApiRoutes.POST)
    .then(res =>
      dispatch({
        type: ActionTypeKeys.GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ActionTypeKeys.GET_POSTS,
        payload: null
      })
    );
};

export const deletePost = (id: string) => (dispatch: Dispatch<ActionTypes>) => {
  axios
    .delete(`${ApiRoutes.POST}/${id}`)
    .then(res =>
      dispatch({
        type: ActionTypeKeys.DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: ActionTypeKeys.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addLike = (id: string) => (dispatch: Dispatch<ActionTypes>) => {
  axios
    .post(`${ApiRoutes.POSTLIKE}/${id}`)
    .then(res => dispatch(getPosts() as any))
    .catch(err =>
      dispatch({
        type: ActionTypeKeys.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const removeLike = (id: string) => (dispatch: Dispatch<ActionTypes>) => {
  axios
    .post(`${ApiRoutes.POSTUNLIKE}/${id}`)
    .then(res => dispatch(getPosts() as any))
    .catch(err =>
      dispatch({
        type: ActionTypeKeys.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getPost = (id: string) => (dispatch: Dispatch<ActionTypes>) => {
  dispatch(setPostLoading());
  axios
    .get(`${ApiRoutes.POST}/${id}`)
    .then(res =>
      dispatch({
        type: ActionTypeKeys.GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ActionTypeKeys.GET_POSTS,
        payload: null
      })
    );
};

export const addComment = (postId: string, commentData: ICommentCreate) => (
  dispatch: Dispatch<ActionTypes>
) => {
  dispatch(clearErrors());
  axios
    .post(`${ApiRoutes.POSTCOMMENT}/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: ActionTypeKeys.GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ActionTypeKeys.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteComment = (postId: string, commentId: string) => (
  dispatch: Dispatch<ActionTypes>
) => {
  axios
    .delete(`${ApiRoutes.POSTCOMMENT}/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: ActionTypeKeys.GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ActionTypeKeys.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setPostLoading = () => {
  return {
    type: ActionTypeKeys.POST_LOADING
  };
};

export const clearErrors = () => {
  return {
    type: ActionTypeKeys.CLEAR_ERRORS
  };
};
