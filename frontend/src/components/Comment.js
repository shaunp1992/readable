import React , { Component } from 'react'
import { FaTrashO, FaEdit, FaAngleUp, FaAngleDown }  from 'react-icons/lib/fa';


class Comment extends Component {
  state = {
    comment: '',
    editing: false
  }

  editComment(){
    this.props.onEdit(this.props.id, null)
    this.setState({ 
        editing: true
    })
  }

  onChangeComment = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  toggleEditState() {
     this.setState({ 
         editing: !this.state.editing
     })
  }
  
  onDelete = () => {
    this.props.onDelete(this.props.id)
  }

  saveComment(){
    this.props.onEdit(null, this.props.editId, this.state.comment)
    this.setState({ 
        editing: false
    })
  }

  onClickUpVote = () => {
    this.props.onClickUpVote(this.props.id)
  }
  
  onClickDownVote = () => {
    this.props.onClickDownVote(this.props.id)
  }

  componentDidMount() {
    const { body } = this.props
    this.setState({
      comment: body
    })
  }

  render() {
    const { editing, comment } = this.state  
    const { voteScore } = this.props
    
    return(
        <div>
            {editing ? 
                <div>
                  <div className="comment-edit-container">
                      <textarea className="comment-edit-textarea" rows="5" onChange={this.onChangeComment} value={this.state.comment} type="text" />
                  </div>
                  <div className="comment-edit-button-container">
                    <input type="button" className="edit-button form-button" onClick={(e) => this.saveComment()} value="Save"/>  
                  </div>
                </div>:
                  <div className="comment-container">
                    <div className="comment-top-container">
                      <div className="comment-edit-container">
                          {comment}
                      </div>
                      <div className="comment-vote-container">
                            <div onClick={() => this.onClickUpVote(comment.id)}>
                                <FaAngleUp size={24} color={'#252525'}/>
                            </div>
                            <div className="vote-score">{voteScore}</div>
                            <div onClick={() => this.onClickDownVote(comment.id)}>
                                <FaAngleDown size={24} color={'#252525'}/>
                            </div>    
                      </div>
                    </div>
                    <div className="comment-bottom-container">
                          <div className="comment-edit-button-container">
                            <div className="comment-edit-button" onClick={(e) => this.editComment()} value="Edit">         
                                <FaEdit size={26} color={'#029be5'} />
                            </div>
                            <div className="comment-delete-button" onClick={(e) => this.onDelete()} value="Delete">         
                                <FaTrashO size={24} color={'#029be5'} />
                            </div>                            
                          </div>
                    </div>
                </div>
            }
        </div>  
    )
  }
}

export default Comment
