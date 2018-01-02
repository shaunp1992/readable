import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Posts from './Posts'
import Post from './Post'
import EditPost from './EditPost'
import NewPost from './NewPost'

import '../App.css'

class App extends Component {
  render() {
    return(
      <div className="App">
            <Switch>
              <Route exact path ='/' component={Posts} />
              <Route exact path ='/new-post' component={NewPost} />
              <Route exact path ='/edit/:id' component={EditPost} isNewPost={false}/>
              <Route exact path ='/:category' component={Posts} />
              <Route exact path ='/:category/:id' component={Post} />
            </Switch>
      </div>
    )
  }
}

export default App
