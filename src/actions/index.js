import * as API from '../api/api'

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_POST = 'GET_POST'
export const GET_POSTS_FROM_CATEGORY = 'GET_POSTS_FROM_CATEGORY'
export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const OPEN_NEW_COMMENT_MODAL = 'OPEN_NEW_COMMENT_MODAL'
export const CLOSE_NEW_COMMENT_MODAL = 'CLOSE_NEW_COMMENT_MODAL'
export const OPEN_EDIT_COMMENT_MODAL = 'OPEN_EDIT_COMMENT_MODAL'
export const CLOSE_EDIT_COMMENT_MODAL = 'CLOSE_EDIT_COMMENT_MODAL'
export const VOTE_POST = 'VOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const OPEN_EDIT_POST_MODAL = 'OPEN_EDIT_POST_MODAL'
export const OPEN_NEW_POST_MODAL = 'OPEN_NEW_POST_MODAL'
export const CLOSE_NEW_POST_MODAL = 'CLOSE_NEW_POST_MODAL'
export const CLOSE_EDIT_POST_MODAL = 'CLOSE_EDIT_POST_MODAL'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const SORT_POSTS = 'SORT_POSTS'

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
      (response) => dispatch(voteComment(response))
    )
  }
}

export function addComment( comment ) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function sendNewCommentData(comment) {
  return (dispatch) => {    
    API.createComment(comment).then(
      (response) => dispatch(addComment(response))
    )
  }
}

export function deleteComment(comment) {
  return {
    type: DELETE_COMMENT,
    comment
  }
}

export function sendDeleteCommentData(id) {
  return (dispatch) => {    
    API.deleteComment(id).then(
      (response) => dispatch(deleteComment(response))
    )
  }
}

export function openEditCommentModal(comment) {
  return {
    type: OPEN_EDIT_COMMENT_MODAL,
    comment
  }
}

export function closeEditCommentModal() {
  return {
    type: CLOSE_EDIT_COMMENT_MODAL
  }
}

export function openNewCommentModal() {
  return {
    type: OPEN_NEW_COMMENT_MODAL
  }
}

export function closeNewCommentModal() {
  return {
    type: CLOSE_NEW_COMMENT_MODAL
  }
}

export function deletePost(post) {
  return {
    type: DELETE_POST,
    post
  }
}

export function sendDeletePostData(id) {
  return (dispatch) => {    
    API.deletePost(id).then(
      (response) => dispatch(deletePost(response))
    )
  }
}

export function openEditPostModal(post) {
  return {
    type: OPEN_EDIT_POST_MODAL,
    post
  }
}

export function openNewPostModal() {
  return {
    type: OPEN_NEW_POST_MODAL
  }
}

export function closeEditPostModal() {
  return {
    type: CLOSE_EDIT_POST_MODAL
  }
}

export function closeNewPostModal() {
  return {
    type: CLOSE_NEW_POST_MODAL
  }
}

export function addPost( post ) {
  return {
    type: ADD_POST,
    post
  }
}

export function sendNewPostData(post) {
  return (dispatch) => {    
    API.createPost(post).then(
      (response) => dispatch(addPost(response))
    )
  }
}

export function editPost( post ) {
  return {
    type: EDIT_POST,
    post
  }
}

export function updatePostData(id, data) {
  return (dispatch) => {    
    API.updatePost(id, data).then(
      (response) => dispatch(editPost(response))
    )
  }
}

export function editComment( comment ) {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export function updateCommentData(id, data) {
  return (dispatch) => {    
    API.updateComment(id, data).then(
      (response) => dispatch(editComment(response))
    )
  }
}

export function sortPosts( sortby ) {
  return {
    type: SORT_POSTS,
    sortby
  }
}