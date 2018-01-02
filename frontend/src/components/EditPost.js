import React, { Component } from 'react'
import PostForm from './PostForm'

class EditPost extends Component {
  render() {

    return(
      <div className="new-post-page">
        <PostForm isNewPost={false} id={this.props.match.params} />
      </div>
    )
  }
}



export default (EditPost)
