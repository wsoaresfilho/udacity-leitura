import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CategoryList from './CategoryList'
import Post from './Post'
import { SORT_BY_DATE, SORT_BY_SCORE } from '../utilities/constants'
import { showSortString } from '../utilities/helpers'
import PostModal from './PostModal'
import { Row, Col, Badge, Button } from 'reactstrap'
import { 
  fetchPostsData,
  sortPosts
} from '../actions'

class Home extends Component {
  static propTypes = {
    posts: PropTypes.array,
    sortby: PropTypes.string,
    loadPosts: PropTypes.func.isRequired,
    sortPosts: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.loadPosts()
  }

  sort = (by) => {
    this.props.sortPosts(by)
    this.props.loadPosts()
  }

  render() {
    const { posts, sortby } = this.props

    return (
      <div>
        <Row>
          <Col>
            <CategoryList></CategoryList>
          </Col>
        </Row>

        <hr/>
        
        <Row className="center">
          <Col>
          {sortby && sortby !== SORT_BY_DATE && (
            <Button color="primary" onClick={() => this.sort(SORT_BY_DATE)}>Sort posts by Date</Button>
          )}
          {sortby && sortby !== SORT_BY_SCORE && (
            <Button color="primary" onClick={() => this.sort(SORT_BY_SCORE)}>Sort posts by Score</Button>
          )}
        
          <span>  </span>

          <Button color="primary" outline>
            Sorted by: <Badge color="secondary">{showSortString(sortby)}</Badge>
          </Button>
          </Col>
        </Row>

        <br/>
         
        <Row>
          <Col>
            {posts &&
              posts.map((post) => (
                <Post id={post.id} key={post.id}></Post>
            ))}
          </Col>
        </Row>

        <PostModal></PostModal>        
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: posts.allPosts,
    sortby: posts.sortBy
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: () => dispatch(fetchPostsData()),
    sortPosts: (crit) => dispatch(sortPosts(crit))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
