import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import '../css/App.css'
import Home from '../components/Home'
import Category from '../components/Category'
import PostDetail from '../components/PostDetail'
import {Container, Navbar, NavbarBrand } from 'reactstrap'
 
class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {

    return (
      <div className="app">
        <Container>
          <Navbar color="secondary" className="text-center margin-bottom" light expand="md">
            <NavbarBrand href="/">Leitura App</NavbarBrand>
          </Navbar>

          <Switch>
            <Route exact path='/' render={() => (
              <Home></Home>            
            )}/>

            <Route exact path='/:category' render={({match}) => (
              <Category category={match.params.category}></Category>
            )} />

            <Route path='/:category/:id' render={({match, history}) => (
              <PostDetail id={match.params.id} history={history}></PostDetail>
            )}/>
          </Switch>
        </Container>
      </div>
    )
  }
}

export default App
