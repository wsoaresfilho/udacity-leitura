import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { VOTE_UP, VOTE_DOWN } from '../utilities/constants'
import Modal from 'react-modal'
import 
{  
  sendVoteCommentData,
  sendNewCommentData,
  sendDeleteCommentData,
  updateCommentData,
  openCommentModal,
  closeCommentModal
} from '../actions'

class Comment extends Component {
  static propTypes = {
    comments: PropTypes.array,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    openCommentModal: PropTypes.func.isRequired,
    closeCommentModal: PropTypes.func.isRequired,
    isCommentModalOpen: PropTypes.bool,
    editComment: PropTypes.func.isRequired
  }

  submitCommentModal = (e) => {
    e.preventDefault()
    console.log("Comentario editado")
    const commentData = {
      timestamp: Date.now(),
      body: e.target.body.value
    }
    this.props.editComment(e.target.id.value, commentData)
    this.props.closeCommentModal()
  }

  render() {
    const comment = this.props.comments.find((c) => {
      return c.id === this.props.id
    })

    const { 
      isCommentModalOpen,
      voteUp,
      voteDown,
      deleteComment,
      closeCommentModal,
      openCommentModal
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
            <button type="button" onClick={() => openCommentModal()}>Edit Comment</button>

            <Modal
              className='modal'
              overlayClassName='overlay'
              isOpen={isCommentModalOpen}
              onRequestClose={closeCommentModal}
              contentLabel='commentModal'
            >
              <p>Edit Comment</p>
              <form onSubmit={this.submitCommentModal}>
                <label>Comment</label>
                <textarea name="body" defaultValue={comment.body}></textarea>
                <input type="hidden" name="id" value={comment.id}></input>
                <button type="button" onClick={() => closeCommentModal()}>Close</button>
                <button type="submit">Submit</button>
              </form>
            </Modal>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ comments }) {
  return {
    comments: comments.comments,
    isCommentModalOpen: comments.isModalOpen
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    voteUp: (id) => dispatch(sendVoteCommentData(id, VOTE_UP)),
    voteDown: (id) => dispatch(sendVoteCommentData(id, VOTE_DOWN)),
    addComment: (comment) => dispatch(sendNewCommentData(comment)),
    deleteComment: (id) => dispatch(sendDeleteCommentData(id)),
    openCommentModal: () => dispatch(openCommentModal()),
    closeCommentModal: () => dispatch(closeCommentModal()),
    editComment: (id, data) => dispatch(updateCommentData(id, data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)
