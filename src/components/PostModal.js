import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import UUID from 'uuid'
import { 
  closeEditPostModal,
  closeNewPostModal,
  updatePostData,
  sendNewPostData
} from '../actions'

class PostModal extends Component {
  submitEditPostModal = (e) => {
    e.preventDefault()
    console.log("Post editado")
    const postData = {
      body: e.target.body.value,
      title: e.target.title.value
    }
    this.props.editPost(e.target.id.value, postData)
    this.props.closeEditPostModal()
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
    this.props.addPost(postData)
    this.props.closeNewPostModal()
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
          <p>Edit Post</p>
          <form onSubmit={this.submitEditPostModal}>
            <label>Title</label>
            <input type="hidden" name="id" value={post.id}></input>
            <input type="text" name="title" defaultValue={post.title}></input>
            <br/>
            <label>Body</label>
            <textarea name="body" defaultValue={post.body}></textarea>
            <button type="button" onClick={() => closeEditPostModal()}>Close</button>
            <button type="submit">Submit</button>
          </form>
        </Modal>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={isNewPostModalOpen}
          onRequestClose={closeNewPostModal}
          contentLabel='postNewModal'
        >
          <p>New Post</p>
          <form onSubmit={this.submitNewPostModal}>
            <label>Title</label>
            <input type="text" name="title"></input>
            <br/>
            <label>Author</label>
            <input type="text" name="author"></input>
            <br/>
            <label>Body</label>
            <textarea name="body"></textarea>
            <button type="button" onClick={() => closeNewPostModal()}>Close</button>
            <button type="submit">Submit</button>
          </form>
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