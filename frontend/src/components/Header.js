import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  
  render() {

      return(
        <div className="header-container">
          <div className="app-title">
              <Link to={`/`}>React Readable Project</Link>
          </div>
          <div className="button">
              <Link to={`/new-post`}>+ Add New Post</Link>    
          </div>
        </div>
      )
  }
}

export default (Header)