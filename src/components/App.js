import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import logo from '../images/logo.svg'
import '../css/App.css'
import Home from '../components/Home'
import Category from '../components/Category'
import PostDetail from '../components/PostDetail'
 
class App extends Component {
  render() {

    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Switch>
          <Route exact path='/' render={() => (
            <Home></Home>            
          )}/>

          <Route exact path='/:category' render={({match}) => (
            <div>
              <Category category={match.params.category}></Category>
            </div>
          )} />

          <Route path='/:category/:id' render={({match, history}) => (
            <PostDetail id={match.params.id} history={history}></PostDetail>
          )}/>

        </Switch>
      </div>
    );
  }
}

export default App