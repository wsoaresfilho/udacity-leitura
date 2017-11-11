import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import UUID from 'uuid'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
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
          <Form onSubmit={this.submitEditCommentModal}>
            <h4 className="center">Edit Comment</h4>
            <input type="hidden" name="id" value={comment.id}></input>
            <FormGroup row>
              <Label for="body" sm={2}>Comment</Label>
              <Col sm={10}>
                <Input type="textarea" name="body" id="body" defaultValue={comment.body}/>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button onClick={() => closeEditCommentModal()}>Close</Button>
                <span>  </span>
                <Button color="success">Submit</Button>
              </Col>
            </FormGroup>
          </Form>
        </Modal>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={isNewCommentModalOpen}
          onRequestClose={closeNewCommentModal}
          contentLabel='commentNewModal'
        >
          <Form onSubmit={this.submitNewCommentModal}>
            <h4 className="center">New Comment</h4>
            <input type="hidden" name="parentId" value={post && post.id}></input>
            <FormGroup row>
              <Label for="author" sm={2}>Author</Label>
              <Col sm={10}>
                <Input type="text" name="author" id="author"/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="body" sm={2}>Comment</Label>
              <Col sm={10}>
                <Input type="textarea" name="body" id="body"/>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button onClick={() => closeNewCommentModal()}>Close</Button>
                <span>  </span>
                <Button color="success">Submit</Button>
              </Col>
            </FormGroup>
          </Form>
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
