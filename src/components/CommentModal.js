import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import UUID from 'uuid'
import 
{  
  sendNewCommentData,
  updateCommentData,
  closeEditCommentModal,
  closeNewCommentModal
  
} from '../actions'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object,
    addComment: PropTypes.func.isRequired,
    closeEditCommentModal: PropTypes.func.isRequired,
    closeNewCommentModal: PropTypes.func.isRequired,
    isNewCommentModalOpen: PropTypes.bool,
    isEditCommentModalOpen: PropTypes.bool,
    editComment: PropTypes.func.isRequired
  }

  submitEditCommentModal = (e) => {
    e.preventDefault()
    console.log("Comentario editado")
    const commentData = {
      timestamp: Date.now(),
      body: e.target.body.value
    }
    this.props.editComment(e.target.id.value, commentData)
    this.props.closeEditCommentModal()
  }

  submitNewCommentModal = (e) => {
    e.preventDefault()
    console.log("Comentario enviado")
    console.log(e.target.author.value)
    const commentData = {
      id: UUID.v1(),
      parentId: e.target.parentId.value,
      timestamp: Date.now(),
      author: e.target.author.value,
      body: e.target.body.value,
      voteScore: 0,
      deleted: false,
      parentDeleted: false
    }
    this.props.addComment(commentData)
    this.props.closeNewCommentModal()
  }

  render() {

    const {
      post,
      comment,
      isEditCommentModalOpen,
      closeEditCommentModal,
      isNewCommentModalOpen,
      closeNewCommentModal
    } = this.props
    
    return (
      <div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={isEditCommentModalOpen}
          onRequestClose={closeEditCommentModal}
          contentLabel='commentEditModal'
        >
          <p>Edit Comment</p>
          <form onSubmit={this.submitEditCommentModal}>
            <label>Comment</label>
            <textarea name="body" defaultValue={comment.body}></textarea>
            <input type="hidden" name="id" value={comment.id}></input>
            <button type="button" onClick={() => closeEditCommentModal()}>Close</button>
            <button type="submit">Submit</button>
          </form>
        </Modal>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={isNewCommentModalOpen}
          onRequestClose={closeNewCommentModal}
          contentLabel='commentNewModal'
        >
          <p>New Comment</p>
          <form onSubmit={this.submitNewCommentModal}>
          
            <label>Author</label>
            <input type="text" name="author"></input>
            <br/>
            <label>Comment</label>
            <textarea name="body"></textarea>
            <input type="hidden" name="parentId" value={post && post.id}></input>
            <button type="button" onClick={() => closeNewCommentModal()}>Close</button>
            <button type="submit">Submit</button>
          </form>
        </Modal>       
      </div>
    )
  }
}

function mapStateToProps({ posts, comments }) {
  return {
    post: posts.post,
    comment: comments.comment,
    isNewCommentModalOpen: comments.isNewModalOpen,
    isEditCommentModalOpen: comments.isEditModalOpen,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    addComment: (comment) => dispatch(sendNewCommentData(comment)),
    closeEditCommentModal: () => dispatch(closeEditCommentModal()),
    closeNewCommentModal: () => dispatch(closeNewCommentModal()),
    editComment: (id, data) => dispatch(updateCommentData(id, data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)
