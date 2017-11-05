import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { sendVotePostData } from '../actions'
import { VOTE_UP, VOTE_DOWN } from '../utilities/constants'

class Post extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  render() {
    const post = this.props.posts.find((p) => {
      return p.id === this.props.id
    })
    return (
      <div>
        <p>Title: <Link to={`/${post.category}/${post.id}`}>{post.title}</Link></p>
        <p>Category: {post.category}</p>
        <p>Score: {post.voteScore}</p>
        <p>Author: {post.author}</p>
        <p>Body: {post.body}</p>
        <button type="button" onClick={() => this.props.voteUp(post.id)}>Vote Up</button>
        <button type="button" onClick={() => this.props.voteDown(post.id)}>Vote Down</button>
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
    voteDown: (id) => dispatch(sendVotePostData(id, VOTE_DOWN))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)