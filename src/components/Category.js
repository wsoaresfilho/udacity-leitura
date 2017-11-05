import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPostsFromCategoryData } from '../actions'
import Post from './Post'

class Category extends Component {
  static propTypes = {
    posts: PropTypes.array,
    loadPosts: PropTypes.func.isRequired
  }
  
  componentWillMount() {
    this.props.loadPosts()    
  }

  render() {
    const { posts } = this.props

    return (
      <div>
        {posts && 
          posts.map((post) => (
            <Post id={post.id} key={post.id}></Post>
        ))}
        <br/>
        <Link to="/">Voltar</Link>
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: posts.allPosts
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadPosts: () => dispatch(fetchPostsFromCategoryData(ownProps.category))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)