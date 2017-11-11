import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, ListGroupItemHeading, Row, Col, ButtonGroup, Button } from 'reactstrap'
import { 
  sendVotePostData, 
  sendDeletePostData,
  openEditPostModal
} from '../actions'
import { VOTE_UP, VOTE_DOWN } from '../utilities/constants'

class Post extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    voteDown: PropTypes.func.isRequired,
    voteUp: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
  }

  render() {
    const post = this.props.posts.find((p) => {
      return p.id === this.props.id
    })

    const {
      voteDown,
      voteUp,
      deletePost,
      openPostModal
    } = this.props

    return (
      <div>
        <ListGroup>
          <ListGroupItem>
            <ListGroupItemHeading>
              Title: <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
            </ListGroupItemHeading>
            <div>
              <Row>
                <Col>Author: {post.author}</Col>
                <Col>Category: {post.category}</Col>
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
                    <Button color="danger" onClick={() => voteDown(post.id)}>Vote Down</Button>
                    <Button>Score: {post.voteScore}</Button>
                    <Button color="success" onClick={() => voteUp(post.id)}>Vote Up</Button>                    
                  </ButtonGroup>
                </Col>
                <Col>
                  <ButtonGroup>
                    <Button color="danger" onClick={() => deletePost(post.id)}>Delete Post</Button>
                    <Button color="warning" onClick={() => openPostModal(post)}>Edit Post</Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </div>
          </ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: posts.allPosts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteUp: (id) => dispatch(sendVotePostData(id, VOTE_UP)),
    voteDown: (id) => dispatch(sendVotePostData(id, VOTE_DOWN)),
    deletePost: (id) => dispatch(sendDeletePostData(id)),
    openPostModal: (p) => dispatch(openEditPostModal(p))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)