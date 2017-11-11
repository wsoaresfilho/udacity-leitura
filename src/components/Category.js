import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Post from './Post'
import sortBy from 'sort-by'
import { SORT_BY_DATE, SORT_BY_SCORE } from '../utilities/constants'
import { showSortString } from '../utilities/helpers'
import PostModal from './PostModal'
import { Row, Col, Badge, Button } from 'reactstrap'
import { 
  fetchPostsFromCategoryData,
  openNewPostModal,
  sortPosts
} from '../actions'

class Category extends Component {
  static propTypes = {
    posts: PropTypes.array,
    loadPosts: PropTypes.func.isRequired,
    openNewPostModal: PropTypes.func.isRequired,
    sortPosts: PropTypes.func.isRequired,
    sortby: PropTypes.string.isRequired
  }

  componentWillMount() {
    this.props.loadPosts()    
  }

  render() {
    const {
      posts,
      openNewPostModal,
      sortPosts,
      sortby,
      category
    } = this.props

    return (
      <div>
        <div className="center">
          <h4 className="capitalize">Category: {category}</h4>
          <hr/>
          <Button className="margin-bottom" color="success" onClick={() => openNewPostModal()}>Add new post</Button>

          <Row className="margin-bottom">
            <Col>
            {sortby && sortby !== SORT_BY_DATE && (
              <Button color="primary" onClick={() => sortPosts(SORT_BY_DATE)}>Sort posts by Date</Button>
            )}
            {sortby && sortby !== SORT_BY_SCORE && (
              <Button color="primary" onClick={() => sortPosts(SORT_BY_SCORE)}>Sort posts by Score</Button>
            )}
          
            <span>  </span>

            <Button color="primary" outline>
              Sorted by: <Badge color="secondary">{showSortString(sortby)}</Badge>
            </Button>
            </Col>
          </Row>
        </div>
        
        {posts && 
          posts.sort(sortBy(sortby)).map((post) => (
            <Post id={post.id} key={post.id}></Post>
        ))}
        <br/>
        <Link className="center" to="/">Voltar</Link>

        <PostModal category={category}></PostModal>        
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

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadPosts: () => dispatch(fetchPostsFromCategoryData(ownProps.category)),
    openNewPostModal: () => dispatch(openNewPostModal()),
    sortPosts: (crit) => dispatch(sortPosts(crit))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)