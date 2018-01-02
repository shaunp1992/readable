import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchPost, fetchCategories, editPostAction, addNewPostAction } from '../actions'
import uuidv1 from 'uuid/v1'
import Header from './Header'

class PostForm extends Component {

  state = {
    id: '',
    title: '',
    author: '',
    body: '',
    category: '',
    notValid: false,
    success: false,
    edited: false
  }

  componentWillMount() {
    this.props.getCategories();
    if(!this.props.isNewPost){
        this.props.getCategories();
        const { id } = this.props.id
        this.props.getPost(id).then(() => {
            const { title, author, body, category } = this.props.post.post
            this.setState({
              id,
              title,
              author,
              body,
              category
            })
          })
        }
  }

  onTitleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  onBodyChange = (e) => {
    this.setState({
      body: e.target.value
    })
  }

  onAuthorChange = (e) => {
    this.setState({
      author: e.target.value
    })
  }

  onCategoryChange = (e) => {
    this.setState({
      category: e.target.value
    })
  }

  onEditClick = () => {
    const { id, title, category, body, author } = this.state
    this.props.editPost(id, {
      title,
      category,
      body,
      author
    })
    .then(() => {
        this.setState({
          success: true
        })
    })
  }
  
  onPostClick() {
    const { title, category, author, body } = this.state
    
    if (title && category && author && body) {
      const newPost = {
        id: uuidv1(),
        timestamp: new Date(),
        title,
        category,
        author,
        body
      } 
      this.props.addPost(newPost)
        .then(() => this.setState({
          success: true,
          title: '',
          category: '',
          author: '',
          body: '',
          notValid: false 
        }))
    } else {
      this.setState({
        notValid: true,
        success: false
      })
    }
  }

  render() {
    const { categories } = this.props.categories
    const { isNewPost } = this.props
    const { id, category } = this.state
    
    const categoryList = categories.map(category => {
      return (
        <option key={category.name} value={category.name}>
          {category.name}
        </option>
      )
    })

    return(
    <div className="page-container">
      <Header/>
      <div className="post-form-container">
        <div className="post-form-container-title">{isNewPost ? "New Post: " : "Edit Post: "}</div>
        
        <div>
          {this.state.success &&
          (isNewPost ? 
           <Redirect to="/" /> :
           <Redirect from={`/edit/${category}/${id}`} to={`/${category}/${id}`}  />
          )}
        </div>
        <div>
          {this.state.notValid && (
            <h3>Please enter all values...</h3> 
          )}
        </div>
          
        <div className="post-form-title">
            <input className="post-form-input" type="text" onChange={(e) => this.onTitleChange(e)} placeholder="Post Title" value={this.state.title} />
        </div>

        <textarea className="post-form-input" placeholder="Write your post here..." value={this.state.body} onChange={(e) => this.onBodyChange(e)} id="" cols="30" rows="8" />  
          
        <select className="post-form-input" onChange={this.onCategoryChange} value={this.state.category}> 
            <option disabled>Choose Category</option>
            {categoryList}
        </select>

        <input className="post-form-input" type="text" onChange={(e) => this.onAuthorChange(e)} placeholder="Author" value={this.state.author} />

        <div className="post-form-button-container">
          {isNewPost ?
              <input className="form-button" type="button" value="Post" onClick={this.onPostClick.bind(this)} /> :
              <input className="form-button" type="button" onClick={this.onEditClick} value="Save" />
          }
        </div>  
      </div>
    </div>
    )
  }
}

const mapStateToProps = ({ post, categories }) => {
  return {
    post,
    categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => dispatch(addNewPostAction(post)),
    editPost: (id, post) => dispatch(editPostAction(id, post)),
    getPost: (id) => dispatch(fetchPost(id)),
    getCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
