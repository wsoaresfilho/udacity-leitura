import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPostsData } from '../actions'
import CategoryList from './CategoryList'
import Post from './Post'

class Home extends Component {
  static propTypes = {
    posts: PropTypes.array,
    loadPosts: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.loadPosts()   
  }

  render() {
    return (
      <div>
        <CategoryList></CategoryList>
        <ul>  
          {this.props.posts &&
          this.props.posts.map((post) => (
            <Post id={post.id} key={post.id}></Post>
          ))}
        </ul>
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
    loadPosts: () => dispatch(fetchPostsData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)