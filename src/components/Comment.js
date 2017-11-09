import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { VOTE_UP, VOTE_DOWN } from '../utilities/constants'
import CommentModal from './CommentModal'
import 
{  
  sendVoteCommentData,
  sendDeleteCommentData,
  openEditCommentModal
} from '../actions'

class Comment extends Component {
  static propTypes = {
    comments: PropTypes.array,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    openEditCommentModal: PropTypes.func.isRequired
  }

  render() {
    const comment = this.props.comments.find((c) => {
      return c.id === this.props.id
    })

    const { 
      voteUp,
      voteDown,
      deleteComment,
      openEditCommentModal
    } = this.props
    
    return (
      <div>
        {comment && (
          <div>
            <ul>
              <li>Author: {comment.author}</li>
              <li>Body: {comment.body}</li>
              <li>Score: {comment.voteScore}</li>
            </ul>
            <button type="button" onClick={() => voteUp(comment.id)}>Vote Up</button>
            <button type="button" onClick={() => voteDown(comment.id)}>Vote Down</button>
            <button type="button" onClick={() => deleteComment(comment.id)}>Delete Comment</button>
            <button type="button" onClick={() => openEditCommentModal(comment)}>Edit Comment</button>

            <CommentModal></CommentModal>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ comments }) {
  return {
    comments: comments.comments
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    voteUp: (id) => dispatch(sendVoteCommentData(id, VOTE_UP)),
    voteDown: (id) => dispatch(sendVoteCommentData(id, VOTE_DOWN)),
    deleteComment: (id) => dispatch(sendDeleteCommentData(id)),
    openEditCommentModal: (comm) => dispatch(openEditCommentModal(comm)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)
