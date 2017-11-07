import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { 
  sendVotePostData, 
  sendDeletePostData, 
  updatePostData,
  closePostModal,
  openPostModal
} from '../actions'
import { VOTE_UP, VOTE_DOWN } from '../utilities/constants'

class Post extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    voteDown: PropTypes.func.isRequired,
    voteUp: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    isPostModalOpen: PropTypes.bool.isRequired
  }

  submitPostModal = (e) => {
    e.preventDefault()
    console.log("Post editado")
    const postData = {
      body: e.target.body.value,
      title: e.target.title.value
    }
    this.props.editPost(e.target.id.value, postData)
    this.props.closePostModal()
  }

  render() {
    const post = this.props.posts.find((p) => {
      return p.id === this.props.id
    })

    const {
      closePostModal,
      isPostModalOpen,
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
        <button type="button" onClick={() => voteUp(post.id)}>Vote Up</button>
        <button type="button" onClick={() => voteDown(post.id)}>Vote Down</button>
        <button type="button" onClick={() => deletePost(post.id)}>Delete Post</button>
        <button type="button" onClick={() => openPostModal()}>Edit Post</button>
        <hr></hr>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={isPostModalOpen}
          onRequestClose={closePostModal}
          contentLabel='postModal'
        >
          <p>Edit Post</p>
          <form onSubmit={this.submitPostModal}>
            <label>Title</label>
            <input type="hidden" name="id" value={post.id}></input>
            <input type="text" name="title" defaultValue={post.title}></input>
            <br/>
            <label>Body</label>
            <textarea name="body" defaultValue={post.body}></textarea>
            <button type="button" onClick={() => closePostModal()}>Close</button>
            <button type="submit">Submit</button>
          </form>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: posts.allPosts,
    isPostModalOpen: posts.isModalOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteUp: (id) => dispatch(sendVotePostData(id, VOTE_UP)),
    voteDown: (id) => dispatch(sendVotePostData(id, VOTE_DOWN)),
    deletePost: (id) => dispatch(sendDeletePostData(id)),
    editPost: (id, data) => dispatch(updatePostData(id, data)),
    openPostModal: () => dispatch(openPostModal()),
    closePostModal: () => dispatch(closePostModal()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)