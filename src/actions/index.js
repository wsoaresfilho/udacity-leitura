import * as API from '../api/api'

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_POST = 'GET_POST'
export const GET_POSTS_FROM_CATEGORY = 'GET_POSTS_FROM_CATEGORY'
export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_POST = 'EDIT_POST'

export function getAllCategories(categories) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function fetchCategoriesData() {
  return (dispatch) => {    
    API.getAllCategories().then(
      (response) => dispatch(getAllCategories(response.categories)
    ))
  }
}

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export function getAllPosts(posts) {
  return {
    type: GET_ALL_POSTS,
    posts
  }
}

export function fetchPostsData() {
  return (dispatch) => {    
    API.getAllPosts().then(
      (response) => dispatch(getAllPosts(response)
    ))
  }
}

export function getPostsFromCategory(posts) {
  return {
    type: GET_POSTS_FROM_CATEGORY,
    posts
  }
}

export function fetchPostsFromCategoryData(category) {
  return (dispatch) => {    
    API.getPostsFromCategory(category).then(
      (response) => dispatch(getPostsFromCategory(response)
    ))
  }
}

export function getPost(post) {
  return {
    type: GET_POST,
    post
  }
}

export function fetchPostData(id) {
  return (dispatch) => {    
    API.getPost(id).then(
      (response) => dispatch(getPost(response)
    ))
  }
}

export function getCommentsFromPost(comments) {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export function fetchCommentsFromPostData(id) {
  return (dispatch) => {    
    API.getComments(id).then(
      (response) => dispatch(getCommentsFromPost(response)
    ))
  }
}

export function votePost( post ) {
  return {
    type: VOTE_POST,
    post
  }
}

export function sendVotePostData(id, option) {
  return (dispatch) => {    
    API.voteOnPost(id, option).then(
      (response) => dispatch(votePost(response)
    ))
  }
}

export function voteComment( comment ) {
  return {
    type: VOTE_COMMENT,
    comment
  }
}

export function sendVoteCommentData(id, option) {
  return (dispatch) => {    
    API.voteOnComment(id, option).then(
      (response) => dispatch(voteComment(response)
    ))
  }
}

export function addPost( post ) {
  return {
    type: ADD_POST,
    newPost: post
  }
}

export function deletePost({ day, meal}) {
  return {
    type: DELETE_POST,
    day,
    meal
  }
}