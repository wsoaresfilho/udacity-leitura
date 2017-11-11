import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { VOTE_UP, VOTE_DOWN } from '../utilities/constants'
import Comment from './Comment'
import PostModal from './PostModal'
import CommentModal from './CommentModal'
import sortBy from 'sort-by'
import { SORT_BY_DATE } from '../utilities/constants'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Col, ButtonGroup, Button } from 'reactstrap'
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
            <h4 className="center">Post Details</h4>
            <ListGroup className="margin-bottom">
              <ListGroupItem>
                <ListGroupItemHeading>
                  Post Title: <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
                </ListGroupItemHeading>
                <ListGroupItemText>
                  <Row>
                    <Col className="capitalize">Author: {post.author}</Col>
                    <Col className="capitalize">Category: {post.category}</Col>
                    <Col>Date: {new Date(post.timestamp).toLocaleDateString()}</Col>
                    <Col>Comments: {post.commentCount}</Col>
                  </Row>
                  <Row>
                    <Col>Text: {post.body}</Col>
                  </Row>
                  <br/>
                  <Row className="center">
                    <Col>
                      <ButtonGroup>
                        <Button color="danger" onClick={() => votePostDown(post.id)}>Vote Down</Button>
                        <Button>Score: {post.voteScore}</Button>
                        <Button color="success" onClick={() => votePostUp(post.id)}>Vote Up</Button>                    
                      </ButtonGroup>
                    </Col>
                    <Col>
                      <ButtonGroup>
                        <Button color="danger" onClick={() => deletePost(post.id)}>Delete Post</Button>
                        <Button color="warning" onClick={() => openPostModal(post)}>Edit Post</Button>
                        <Button color="primary" onClick={() => this.newComment(post)}>New Comment</Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </ListGroupItemText>
              </ListGroupItem>
            </ListGroup>

            <br/> <br/>
            <div>
              <h4 className="center">Comments</h4>
              {comments && 
                comments.sort(sortBy(SORT_BY_DATE)).map((comment) => (
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