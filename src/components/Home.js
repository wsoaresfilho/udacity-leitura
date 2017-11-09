import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CategoryList from './CategoryList'
import Post from './Post'
import { SORT_BY_DATE, SORT_BY_SCORE } from '../utilities/constants'
import { showSortString } from '../utilities/helpers'
import PostModal from './PostModal'
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
        <CategoryList></CategoryList>

        <p>Sorted by: {showSortString(sortby)}</p>
        {sortby && sortby !== SORT_BY_DATE && (
          <button type="button" onClick={() => this.sort(SORT_BY_DATE)}>Sort by Date</button>
        )}
        {sortby && sortby !== SORT_BY_SCORE && (
          <button type="button" onClick={() => this.sort(SORT_BY_SCORE)}>Sort by Score</button>
        )}
         
        {posts &&
          posts.map((post) => (
            <Post id={post.id} key={post.id}></Post>
        ))}

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
