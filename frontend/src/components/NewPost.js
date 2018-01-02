import React, { Component } from 'react'
import PostForm from './PostForm'

class NewPost extends Component {
  render() {
    return(
      <div className="new-post-page">
        <PostForm isNewPost={true}/>
      </div>
    )
  }
}



export default (NewPost)
