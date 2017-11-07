import { combineReducers } from 'redux'

import {
  GET_CATEGORIES,
  SELECT_CATEGORY,
  GET_ALL_POSTS,
  GET_POSTS_FROM_CATEGORY,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  VOTE_POST,
  EDIT_POST,
  GET_COMMENTS,
  VOTE_COMMENT,
  ADD_COMMENT,
  DELETE_COMMENT,
  CLOSE_COMMENT_MODAL,
  OPEN_COMMENT_MODAL,
  CLOSE_POST_MODAL,
  OPEN_POST_MODAL,
  EDIT_COMMENT
} from '../actions'

function categories (state={}, action) {
  switch (action.type) {
    case GET_CATEGORIES :
      return {
        ...state,
        allCategories: action.categories,
        selected: ""
      }
    case SELECT_CATEGORY :
      return {
        ...state,
        selected: action.category
      }
    default :
      return state
  }
}

const initialPostState = {
  allPosts: [],
  post: {},
  isModalOpen: false
}

function posts (state=initialPostState, action) {
  switch (action.type) {
    case GET_ALL_POSTS :
      return {
        ...state,
        allPosts: action.posts
      }
    case GET_POSTS_FROM_CATEGORY :
      return {
        ...state,
        allPosts: action.posts
      }
    case GET_POST :
      return {
        ...state,
        post: action.post
      }
    case VOTE_POST :
      return {
        ...state,
        allPosts: state.allPosts.map(post => {
          if(post.id === action.post.id) {
            post.voteScore = action.post.voteScore
          }
          return post
        }),
        post: action.post
      }
    case ADD_POST :
      return {
        ...state,
        allPosts: state.allPosts.concat(action.post)
      }
    case EDIT_POST :
      return {
        ...state,
        allPosts: state.allPosts.map((post) => {
          if(post.id === action.post.id) {
            post = action.post
          }
          return post
        })
      }
    case DELETE_POST :
      return {
        ...state,
        allPosts: state.allPosts.filter((p) => {
          return p.id !== action.post.id
        })
      }
    case OPEN_POST_MODAL :
      return {
        ...state,
        isModalOpen : true
      }
    case CLOSE_POST_MODAL :
      return {
        ...state,
        isModalOpen : false
      }
    default :
      return state
  }
}

const initialCommentState = {
  comments: [],
  isModalOpen: false
}

function comments (state=initialCommentState, action) {
  switch (action.type) {
    case GET_COMMENTS :
      return {
        ...state,
        comments: action.comments
      }
    case VOTE_COMMENT :
      return {
        ...state,
        comments: state.comments.map(comment => {
          if(comment.id === action.comment.id) {
            comment.voteScore = action.comment.voteScore
          }
          return comment
        })
      }
    case ADD_COMMENT :
      return {
        ...state,
        comments: state.comments.concat(action.comment)
      }
    case DELETE_COMMENT :
      return {
        ...state,
        comments: state.comments.filter((c) => {
          return c.id !== action.comment.id
        })
      }
    case EDIT_COMMENT :
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if(comment.id === action.comment.id) {
            comment = action.comment
          }
          return comment
        })
      }
    case OPEN_COMMENT_MODAL :
      return {
        ...state,
        isModalOpen : true
      }
    case CLOSE_COMMENT_MODAL :
      return {
        ...state,
        isModalOpen : false
      }
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})