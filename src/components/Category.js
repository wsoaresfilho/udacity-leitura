import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Post from './Post'
import sortBy from 'sort-by'
import { SORT_BY_DATE, SORT_BY_SCORE } from '../utilities/constants'
import { showSortString } from '../utilities/helpers'
import PostModal from './PostModal'
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
        <h1 className="capitalize">Category: {category}</h1>
        <button type="button" onClick={() => openNewPostModal()}>New Post</button>
        <p>Sorted by: {showSortString(sortby)}</p>
        {sortby !== SORT_BY_DATE && (
          <button type="button" onClick={() => sortPosts(SORT_BY_DATE)}>Sort by Date</button>
        )}
        {sortby !== SORT_BY_SCORE && (
          <button type="button" onClick={() => sortPosts(SORT_BY_SCORE)}>Sort by Score</button>
        )}
        
        {posts && 
          posts.sort(sortBy(sortby)).map((post) => (
            <Post id={post.id} key={post.id}></Post>
        ))}
        <br/>
        <Link to="/">Voltar</Link>

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