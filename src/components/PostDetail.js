import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { VOTE_UP, VOTE_DOWN } from '../utilities/constants'
import 
{  
  fetchCommentsFromPostData,
  fetchPostData,
  sendVoteCommentData
} from '../actions'

class PostDetail extends Component {
  static propTypes = {
    post: PropTypes.object,
    comments: PropTypes.array,
    loadPost: PropTypes.func.isRequired,
    loadComments: PropTypes.func.isRequired
  }
  
  componentWillMount() {
    this.props.loadPost()
    this.props.loadComments()
  }

  render() {
    const { post, comments, history } = this.props

    return (
      <div>
        <div>
          <p>{post && post.title }</p>
        </div>

        <div>
            {comments && 
              comments.map((comment) => (
                <div key={comment.id}>
                  <ul>
                    <li>Author: {comment.author}</li>
                    <li>Body: {comment.body}</li>
                    <li>Score: {comment.voteScore}</li>
                  </ul>
                  <button type="button" onClick={() => this.props.voteUp(comment.id)}>Vote Up</button>
                  <button type="button" onClick={() => this.props.voteDown(comment.id)}>Vote Down</button>
                </div>
            ))}
        </div>
        <br/>
        <Link onClick={() => history.goBack()} to="">Voltar</Link>
      </div>
    )
  }
}

function mapStateToProps({ posts, comments }) {
  return {
    post: posts.post,
    comments: comments.comments
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadPost: () => dispatch(fetchPostData(ownProps.id)),
    loadComments: () => dispatch(fetchCommentsFromPostData(ownProps.id)),
    voteUp: (id) => dispatch(sendVoteCommentData(id, VOTE_UP)),
    voteDown: (id) => dispatch(sendVoteCommentData(id, VOTE_DOWN))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)