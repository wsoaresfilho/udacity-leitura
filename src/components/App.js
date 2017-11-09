import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import '../css/App.css'
import Home from '../components/Home'
import Category from '../components/Category'
import PostDetail from '../components/PostDetail'
 
class App extends Component {

  render() {

    return (
      <div className="App">

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
      </div>
    )
  }
}

export default App
