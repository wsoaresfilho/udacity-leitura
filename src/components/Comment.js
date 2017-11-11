import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { VOTE_UP, VOTE_DOWN } from '../utilities/constants'
import CommentModal from './CommentModal'
import { ListGroup, ListGroupItem, Row, Col, ButtonGroup, Button } from 'reactstrap'
import 
{  
  sendVoteCommentData,
  sendDeleteCommentData,
  openEditCommentModal
} from '../actions'

class Comment extends Component {
  static propTypes = {
    comments: PropTypes.array,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    openEditCommentModal: PropTypes.func.isRequired
  }

  render() {
    const comment = this.props.comments.find((c) => {
      return c.id === this.props.id
    })

    const { 
      voteUp,
      voteDown,
      deleteComment,
      openEditCommentModal
    } = this.props
    
    return (
      <div>
        {comment && (
          <div>            
            <ListGroup>
              <ListGroupItem>
                <div>
                  <Row>
                    <Col className="capitalize">Author: {comment.author}</Col>
                    <Col>Date: {new Date(comment.timestamp).toLocaleDateString()}</Col>
                  </Row>
                  <Row>
                    <Col>Comment: {comment.body}</Col>
                  </Row>
                  <br/>
                  <Row className="center">
                    <Col>
                      <ButtonGroup>
                        <Button color="danger" onClick={() => voteDown(comment.id)}>Vote Down</Button>
                        <Button>Score: {comment.voteScore}</Button>
                        <Button color="success" onClick={() => voteUp(comment.id)}>Vote Up</Button>                    
                      </ButtonGroup>
                    </Col>
                    <Col>
                      <ButtonGroup>
                        <Button color="danger" onClick={() => deleteComment(comment.id)}>Delete Comment</Button>
                        <Button color="warning" onClick={() => openEditCommentModal(comment)}>Edit Comment</Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </div>
              </ListGroupItem>
            </ListGroup>

            <CommentModal></CommentModal>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ comments }) {
  return {
    comments: comments.comments
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    voteUp: (id) => dispatch(sendVoteCommentData(id, VOTE_UP)),
    voteDown: (id) => dispatch(sendVoteCommentData(id, VOTE_DOWN)),
    deleteComment: (id) => dispatch(sendDeleteCommentData(id)),
    openEditCommentModal: (comm) => dispatch(openEditCommentModal(comm)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)
