import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { 
  sendVotePostData, 
  sendDeletePostData,
  openEditPostModal
} from '../actions'
import { VOTE_UP, VOTE_DOWN } from '../utilities/constants'

class Post extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    voteDown: PropTypes.func.isRequired,
    voteUp: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
  }

  render() {
    const post = this.props.posts.find((p) => {
      return p.id === this.props.id
    })

    const {
      voteDown,
      voteUp,
      deletePost,
      openPostModal
    } = this.props

    return (
      <div>
        <p>Title: <Link to={`/${post.category}/${post.id}`}>{post.title}</Link></p>
        <p>Category: {post.category}</p>
        <p>Number of Comments: {post.commentCount}</p>
        <p>Score: {post.voteScore}</p>
        <p>Author: {post.author}</p>
        <p>Date: {new Date(post.timestamp).toLocaleDateString()}</p>
        <button type="button" onClick={() => voteUp(post.id)}>Vote Up</button>
        <button type="button" onClick={() => voteDown(post.id)}>Vote Down</button>
        <button type="button" onClick={() => deletePost(post.id)}>Delete Post</button>
        <button type="button" onClick={() => openPostModal(post)}>Edit Post</button>
        <hr></hr>
        
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: posts.allPosts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteUp: (id) => dispatch(sendVotePostData(id, VOTE_UP)),
    voteDown: (id) => dispatch(sendVotePostData(id, VOTE_DOWN)),
    deletePost: (id) => dispatch(sendDeletePostData(id)),
    openPostModal: (p) => dispatch(openEditPostModal(p))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)