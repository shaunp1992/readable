import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect  } from 'react-router-dom'
import { FaTrashO, FaEdit, FaAngleUp, FaAngleDown }  from 'react-icons/lib/fa';
import { upVotePostAction, downVotePostAction, removePostAction } from '../actions'
import Timestamp from 'react-timestamp'

class PostInfo extends Component {
  
  state = {
    deleted: false
  }

  onDelete = (id) => {
    this.props.removePost(id)
      .then(() => {
        this.setState({
          deleted: true
        })
      })
  }

  onClickDownVote = (id) => {
    this.props.downVote(id)
  }

  onClickUpVote = (id) => {
    this.props.upVote(id)
  }

  render() {
    const { id, author, body, category, title, voteScore, timestamp } = this.props.post
    const { singlePost } = this.props
    
    if(this.state.deleted) {
      return (<Redirect to='/' />)
    } 
    else {
      return(
        <div className="post-info-container">
            <div className="post-top-container">
              <div className="post-title">
                <Link to={`/${category}/${id}`}>{title}</Link>  
                <div className="post-author meta-text">By {author}</div>
              </div>
              <div className="post-time meta-text">
                <Timestamp time={timestamp} format='ago' />
              </div>
            </div>
              
            <div className={"post-main-container " + (singlePost ? 'single' : 'multiple')}>
              <div className="post-left-container">
                  <div className="post-body">{body}</div>    
                  <div className="post-category meta-text">{category}</div>
                </div> 
                <div className="post-right-container">
                    <div className="post-vote-container">
                        <div className="vote-control" onClick={() => this.onClickUpVote(id)}>
                            <FaAngleUp size={24} color={'#252525'}/>
                        </div>
                        <div className="vote-score">{voteScore}</div>
                        <div className="vote-control" onClick={() => this.onClickDownVote(id)}>
                            <FaAngleDown size={24} color={'#252525'}/>
                        </div>
                    </div>
                    <div className="post-controls-container">
                      <div className="post-edit-button">
                        <Link to={`/edit/${id}`}><FaEdit size={26} color={'#029be5'} /></Link>
                      </div>
                      <div className="post-delete-button" onClick={() => this.onDelete(id)}>
                          <FaTrashO size={24} color={'#029be5'} />
                      </div>
                    </div>
                </div> 
            </div>  
        </div>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    upVote: (id) => dispatch(upVotePostAction(id)),
    downVote: (id) => dispatch(downVotePostAction(id)),
    removePost: (id) => dispatch(removePostAction(id))
  }
}

export default connect(null, mapDispatchToProps)(PostInfo)
