import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'

import { deleteCommentAction, editCommentAction, upVoteCommentAction, downVoteCommentAction } from '../actions'

class CommentList extends Component {

  state = {
    edit: false,
    editId: ''
  }

  onEdit = (id, editId, comment) => {
    if (comment) {
      this.props.editComment(editId, {
        timestamp: Date.now(),
        body: comment
      })
    }

    this.setState({
      edit: !this.state.edit,
      editId: id
    })
  }

  onDelete = (id) => {
    this.props.deleteComment(id)
  }
  
  onClickUpVote = (id) => {
    this.props.upVoteComment(id)
  }

  onClickDownVote = (id) => {
    this.props.downVoteComment(id)
  }

  render() {

    let commentList
    if (this.props.comments) {
      commentList = this.props.comments.map(comment => (
        <li key={comment.id}>
            <Comment onClickUpVote={this.onClickUpVote} onClickDownVote={this.onClickDownVote} onDelete={this.onDelete} onEdit={this.onEdit} editId={this.state.editId} id={comment.id} body={comment.body} voteScore={comment.voteScore}/>
        </li>
      ))
    }

    return( 
      <div className="comments-container">
        <ul className="comments">
          <div className="comments-title-container">Comments...</div>
          {commentList}
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (id) => dispatch(deleteCommentAction(id)),
    editComment: (id, comment) => dispatch(editCommentAction(id, comment)),
    upVoteComment: (id) => dispatch(upVoteCommentAction(id)),
    downVoteComment: (id) => dispatch(downVoteCommentAction(id))
  }
}

export default connect(null, mapDispatchToProps)(CommentList)
