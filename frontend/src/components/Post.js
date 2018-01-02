import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, addCommentAction } from '../actions'
import uuidv1 from 'uuid/v1'
import PostInfo from './PostInfo'
import CommentForm from './CommentForm'
import Comments from './Comments'
import Header from './Header'

class Post extends Component {
  
  state = {
    commentText: '',
    loaded: false
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getPost(id)
  }

  onInputChange = (e) => {
    this.setState({
      commentText: e.target.value
    })
  }

  onCommentSubmit = (e) => {
    e.preventDefault();
    if (this.state.commentText) {
      const newComment = {
        id: uuidv1(),
        timestamp: Date.now(),
        body: this.state.commentText,
        author: this.props.post.post.author,
        parentId: this.props.post.post.id
      } 
      // POST new comment
      this.props.addComment(newComment)
        .then(() => {
          this.setState({
            commentText: ''
          })
        })
    }
  }

  componentWillReceiveProps() {
      this.setState({
          loaded: true
        })
  }
  
  render() {
    const { post } = this.props.post
    const { comments } = this.props.post.post
    const { loaded, commentText } = this.state
    
    return(
    <div className="post-page">
        <Header/>
        {loaded && 
            <div className="post-container">        
              <div className="post-info">
                    <PostInfo post={post} singlePost={true} />
              </div>
              <div className="post-form-and-comments-container">
                <div className="post-comments-container">
                    <Comments comments={comments} />
                </div>        
                <div className="post-comment-form-container">
                    <CommentForm commentText={commentText} onCommentSubmit={this.onCommentSubmit} onInputChange={this.onInputChange} />
                </div>      
              </div>
            </div>
          }
    </div>
    )
  }
}

const mapStateToProps = ({ post }) => {
  return {
    post: post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (id) => dispatch(fetchPost(id)),
    addComment: (comment) => dispatch(addCommentAction(comment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)