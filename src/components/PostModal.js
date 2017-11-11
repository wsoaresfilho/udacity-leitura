import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import UUID from 'uuid'
import { validateForm } from '../utilities/helpers'
import { Col, Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap'
import { 
  closeEditPostModal,
  closeNewPostModal,
  updatePostData,
  sendNewPostData
} from '../actions'

class PostModal extends Component {
  state = {
    invalid: false
  }

  submitEditPostModal = (e) => {
    e.preventDefault()
    const postData = {
      body: e.target.body.value,
      title: e.target.title.value
    }
    if (validateForm(postData)) {
      this.props.editPost(e.target.id.value, postData)
      this.props.closeEditPostModal()
    } else {
      this.setState({invalid: true})
    }
  }

  submitNewPostModal = (e) => {
    e.preventDefault()
    const postData = {
      id: UUID.v1(),
      timestamp: Date.now(),
      author: e.target.author.value,
      body: e.target.body.value,
      title: e.target.title.value,
      category: this.props.category
    }
    if (validateForm(postData)) {
      this.props.addPost(postData)
      this.props.closeNewPostModal()
    } else {
      this.setState({invalid: true})
    }
  }

  checkIfEmpty = (e) => {
    e.preventDefault()
    if(e.target.value !== "") {
      this.setState({invalid: false})
    }
  }
  
  render() {
    const {
      post,
      isEditPostModalOpen,
      isNewPostModalOpen,
      closeEditPostModal,
      closeNewPostModal
    } = this.props

    return (
      <div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={isEditPostModalOpen}
          onRequestClose={closeEditPostModal}
          contentLabel='postEditModal'
        >
          <Form onSubmit={this.submitEditPostModal}>
            <h4 className="center">Edit Post</h4>
            <input type="hidden" name="id" value={post.id}></input>
            <FormGroup row>
              <Label for="title" sm={2}>Title*</Label>
              <Col sm={10}>
                <Input type="text" name="title" id="title" defaultValue={post.title} onChange={this.checkIfEmpty}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="body" sm={2}>Text*</Label>
              <Col sm={10}>
                <Input type="textarea" name="body" id="body" defaultValue={post.body} onChange={this.checkIfEmpty}/> 
                <FormFeedback>*Required</FormFeedback>
                {this.state.invalid && (
                  <FormFeedback className="red">ERROR! Fill all the required inputs!</FormFeedback>
                )}                
              </Col>              
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button onClick={() => {
                    closeEditPostModal()
                    this.setState({invalid: false})
                  }}>Close</Button>
                <span>  </span>
                <Button color="success">Submit</Button>
              </Col>              
            </FormGroup>
          </Form>
        </Modal>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={isNewPostModalOpen}
          onRequestClose={closeNewPostModal}
          contentLabel='postNewModal'
        >
          <Form onSubmit={this.submitNewPostModal}>
            <h4 className="center">New Post</h4>
            <FormGroup row>
              <Label for="title" sm={2}>Title*</Label>
              <Col sm={10}>
                <Input type="text" name="title" id="title" onChange={this.checkIfEmpty}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="author" sm={2}>Author*</Label>
              <Col sm={10}>
                <Input type="text" name="author" id="author" onChange={this.checkIfEmpty}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="body" sm={2}>Text*</Label>
              <Col sm={10}>
                <Input type="textarea" name="body" id="body" onChange={this.checkIfEmpty}/>
                <FormFeedback>*Required</FormFeedback>
                {this.state.invalid && (
                  <FormFeedback className="red">ERROR! Fill all the required inputs!</FormFeedback>
                )} 
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button onClick={() => {
                    closeNewPostModal()
                    this.setState({invalid: false})
                  }}>Close</Button>
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

function mapStateToProps({ posts }) {
  return {
    post: posts.post,
    isEditPostModalOpen: posts.isEditModalOpen,
    isNewPostModalOpen: posts.isNewModalOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    closeEditPostModal: () => dispatch(closeEditPostModal()),
    closeNewPostModal: () => dispatch(closeNewPostModal()),
    addPost: (data) => dispatch(sendNewPostData(data)),
    editPost: (id, data) => dispatch(updatePostData(id, data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostModal)