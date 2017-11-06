import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { VOTE_UP, VOTE_DOWN } from '../utilities/constants'
import Modal from 'react-modal'
import UUID from 'uuid'
import 
{  
  fetchCommentsFromPostData,
  fetchPostData,
  sendVoteCommentData,
  sendNewCommentData,
  sendDeleteCommentData
} from '../actions'

class PostDetail extends Component {
  state = {
    commentModalOpen: false
  }
  closeCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: false
    }))
  }
  openCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: true
    }))
  }
  submitModal = (e) => {
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
    this.closeCommentModal()
  }

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
                  <button type="button" onClick={() => this.props.deleteComment(comment.id)}>Delete</button>                 
                </div>
            ))}
        </div>
        <button type="button" onClick={() => this.openCommentModal()}>New Comment</button>
        <br/>
        <Link onClick={() => history.goBack()} to="">Voltar</Link>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.commentModalOpen}
          onRequestClose={this.closeCommentModal}
          contentLabel='Modal'
        >
          <p>New Comment</p>
          <form onSubmit={this.submitModal}>
          
            <label>Author</label>
            <input type="text" name="author"></input>
            <br/>
            <label>Comment</label>
            <textarea name="body"></textarea>
            <input type="hidden" name="parentId" value={post && post.id}></input>
            <button type="button" onClick={() => this.closeCommentModal()}>Close</button>
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
    comments: comments.comments
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadPost: () => dispatch(fetchPostData(ownProps.id)),
    loadComments: () => dispatch(fetchCommentsFromPostData(ownProps.id)),
    voteUp: (id) => dispatch(sendVoteCommentData(id, VOTE_UP)),
    voteDown: (id) => dispatch(sendVoteCommentData(id, VOTE_DOWN)),
    addComment: (comment) => dispatch(sendNewCommentData(comment)),
    deleteComment: (id) => dispatch(sendDeleteCommentData(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)