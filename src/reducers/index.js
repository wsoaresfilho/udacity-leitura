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
  VOTE_COMMENT
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

function posts (state={}, action) {
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
        posts: state.posts.concat([action.newPost])
      }
    // case DELETE_POST :
    //   return {
    //     ...state,
    //     [day]: {
    //       ...state[day],
    //       [meal]: null,
    //     }
    //   }
    default :
      return state
  }
}

function comments (state={}, action) {
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
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})