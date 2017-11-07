import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Post from './Post'
import Modal from 'react-modal'
import UUID from 'uuid'
import { 
  fetchPostsFromCategoryData,
  openPostModal,
  closePostModal,
  sendNewPostData
} from '../actions'

class Category extends Component {
  static propTypes = {
    posts: PropTypes.array,
    loadPosts: PropTypes.func.isRequired,
    openPostModal: PropTypes.func.isRequired,
    closePostModal: PropTypes.func.isRequired,
  }

  submitPostModal = (e) => {
    e.preventDefault()
    console.log("Post enviado")
    const postData = {
      id: UUID.v1(),
      timestamp: Date.now(),
      author: e.target.author.value,
      body: e.target.body.value,
      title: e.target.title.value,
      category: this.props.category
    }
    this.props.addPost(postData)
    this.props.closePostModal()
  }
  
  componentWillMount() {
    this.props.loadPosts()    
  }

  render() {
    const { 
      posts,
      openPostModal,
      closePostModal,
      isPostModalOpen
    } = this.props

    return (
      <div>
        <h1 className="capitalize">Category: {this.props.category}</h1>
        <button type="button" onClick={() => openPostModal()}>New Post</button>
        {posts && 
          posts.map((post) => (
            <Post id={post.id} key={post.id}></Post>
        ))}
        <br/>
        <Link to="/">Voltar</Link>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={isPostModalOpen}
          onRequestClose={closePostModal}
          contentLabel='PostModal'
        >
          <p>New Post</p>
          <form onSubmit={this.submitPostModal}>
            <label>Title</label>
            <input type="text" name="title"></input>
            <br/>
            <label>Author</label>
            <input type="text" name="author"></input>
            <br/>
            <label>Body</label>
            <textarea name="body"></textarea>
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

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadPosts: () => dispatch(fetchPostsFromCategoryData(ownProps.category)),
    openPostModal: () => dispatch(openPostModal()),
    closePostModal: () => dispatch(closePostModal()),
    addPost: (data) => dispatch(sendNewPostData(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)