import React, { Component } from 'react'

class CommentForm extends Component {

  render() {
    const { commentText, onInputChange, onCommentSubmit } = this.props
      
    return(
      <div className="comment-form-container">
        <div className="comments-title-container">New Comment...</div>
        <form onSubmit={onCommentSubmit}>
            <div className="comment-textarea-container">
                <textarea className="comment-edit-textarea" placeholder="Enter your comments..." onChange={onInputChange} value={commentText} name="comments" id="" cols="30" rows="5" />
            </div>
            <div className="comment-submit-container">
                <input className="form-button" value="Add Comment"type="submit"/>
            </div>
        </form>
      </div> 
    )
  }
}

export default (CommentForm)
