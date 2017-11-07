import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { VOTE_UP, VOTE_DOWN } from '../utilities/constants'
import Modal from 'react-modal'
import UUID from 'uuid'
import Comment from './Comment'
import 
{  
  fetchCommentsFromPostData,
  fetchPostData,
  sendDeletePostData,
  sendNewCommentData,
  sendVotePostData,
  openCommentModal,
  closeCommentModal
} from '../actions'

class PostDetail extends Component {

  submitCommentModal = (e) => {
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
    this.props.closeCommentModal()
  }

  static propTypes = {
    post: PropTypes.object,
    comments: PropTypes.array,
    isCommentModalOpen: PropTypes.bool,
    loadPost: PropTypes.func.isRequired,
    loadComments: PropTypes.func.isRequired,
    openCommentModal: PropTypes.func.isRequired,
    closeCommentModal: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
  }
  
  componentWillMount() {
    this.props.loadPost()
    this.props.loadComments()
  }

  render() {
    const { 
      post,
      comments,
      history,
      isCommentModalOpen,
      votePostUp,
      votePostDown,
      deletePost,
      closeCommentModal,
      openCommentModal
    } = this.props

    return (
      <div>
        {post.id && (
          <div>
            <div>
              <p>Title: {post.title}</p>
              <p>Category: {post.category}</p>
              <p>Number of Comments: {post.commentCount}</p>
              <p>Score: {post.voteScore}</p>
              <p>Author: {post.author}</p>
              <p>Body: {post.body}</p>
              <button type="button" onClick={() => votePostUp(post.id)}>Vote Up</button>
              <button type="button" onClick={() => votePostDown(post.id)}>Vote Down</button>
              <button type="button" onClick={() => deletePost(post.id)}>Delete Post</button>
            </div>
            <button type="button" onClick={() => openCommentModal()}>New Comment</button>
            <hr/>
            <div>
              {comments && 
                comments.map((comment) => (
                  <Comment id={comment.id} key={comment.id}></Comment>
              ))}
            </div>
          </div>
        )}
        {!post.id && (
          <p>There´s no post with this id.</p>
        )}
        
        <br/>
        <Link onClick={() => history.goBack()} to="">Voltar</Link>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={isCommentModalOpen}
          onRequestClose={closeCommentModal}
          contentLabel='CommentModal'
        >
          <p>New Comment</p>
          <form onSubmit={this.submitCommentModal}>
          
            <label>Author</label>
            <input type="text" name="author"></input>
            <br/>
            <label>Comment</label>
            <textarea name="body"></textarea>
            <input type="hidden" name="parentId" value={post && post.id}></input>
            <button type="button" onClick={() => closeCommentModal()}>Close</button>
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
    comments: comments.comments,
    isCommentModalOpen: comments.isModalOpen,
    isPostModalOpen: posts.isModalOpen
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadPost: () => dispatch(fetchPostData(ownProps.id)),
    loadComments: () => dispatch(fetchCommentsFromPostData(ownProps.id)),
    votePostUp: (id) => dispatch(sendVotePostData(id, VOTE_UP)),
    votePostDown: (id) => dispatch(sendVotePostData(id, VOTE_DOWN)),
    addComment: (comment) => dispatch(sendNewCommentData(comment)),
    deletePost: (id) => dispatch(sendDeletePostData(id)),
    openCommentModal: () => dispatch(openCommentModal()),
    closeCommentModal: () => dispatch(closeCommentModal())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)