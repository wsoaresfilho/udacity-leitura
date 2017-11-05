import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategoriesData, selectCategory } from '../actions'

class CategoryList extends Component {
  static propTypes = {
    loadCategories: PropTypes.func.isRequired,
    categories: PropTypes.array
  }

  componentWillMount() {
    if(!this.props.categories) {
      this.props.loadCategories()
    }    
  }

  render() {
    return (
      <div>
        <ul>  
          {this.props.categories &&
          this.props.categories.map((cat) => (
            <li key={cat.name} className="capitalize" onClick={() => this.props.selectCategory(cat.name)}>
              <Link to={`/${cat.path}`}>{cat.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: categories.allCategories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: () => dispatch(fetchCategoriesData()),
    selectCategory: (categ) => dispatch(selectCategory(categ))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList)