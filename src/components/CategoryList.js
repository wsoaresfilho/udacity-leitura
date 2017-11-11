import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategoriesData, selectCategory } from '../actions'
import { Button, ButtonGroup } from 'reactstrap';

class CategoryList extends Component {
  static propTypes = {
    loadCategories: PropTypes.func.isRequired,
    categories: PropTypes.array
  }

  componentDidMount() {
    if(!this.props.categories) {
      this.props.loadCategories()
    }    
  }

  render() {
    return (
      <div className="center">
        <h4>Categories:</h4>
        <ButtonGroup vertical>
          {this.props.categories &&
          this.props.categories.map((cat) => (              
            <Button color="light" key={cat.name}>
              <Link to={`/${cat.path}`} className="capitalize" onClick={() => this.props.selectCategory(cat.name)}>{cat.name}</Link>
            </Button>              
          ))}
        </ButtonGroup>
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