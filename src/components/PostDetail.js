import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { VOTE_UP, VOTE_DOWN } from '../utilities/constants'
import Comment from './Comment'
import PostModal from './PostModal'
import CommentModal from './CommentModal'
import 
{  
  fetchCommentsFromPostData,
  fetchPostData,
  sendDeletePostData,
  sendVotePostData,
  openEditPostModal,
  openNewCommentModal,
  getPost
} from '../actions'

class PostDetail extends Component {

  static propTypes = {
    post: PropTypes.object,
    comments: PropTypes.array,
    loadPost: PropTypes.func.isRequired,
    loadComments: PropTypes.func.isRequired,
    openNewCommentModal: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
  }
  
  componentWillMount() {
    this.props.loadPost()
    this.props.loadComments()
  }

  newComment = (post) => {
    this.props.setPost(post)
    this.props.openNewCommentModal()
  }

  render() {
    const { 
      post,
      comments,
      history,
      votePostUp,
      votePostDown,
      deletePost,
      openPostModal
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
              <button type="button" onClick={() => openPostModal(post)}>Edit Post</button>
            </div>
            <button type="button" onClick={() => this.newComment(post)}>New Comment</button>
            <hr/>
            <div>
              {comments && 
                comments.map((comment) => (
                  <Comment id={comment.id} key={comment.id}></Comment>
              ))}
            </div>

            <PostModal category={post.category}></PostModal>
            <CommentModal></CommentModal>
          </div>          
        )}
        {!post.id && (
          <p>There´s no post with this id.</p>
        )}
        
        <br/>
        
        <Link onClick={() => history.goBack()} to="">Voltar</Link>
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
    deletePost: (id) => dispatch(sendDeletePostData(id)),
    openNewCommentModal: () => dispatch(openNewCommentModal()),
    openPostModal: (p) => dispatch(openEditPostModal(p)),
    setPost: (post) => dispatch(getPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)