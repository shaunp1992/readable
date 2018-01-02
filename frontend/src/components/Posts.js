import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, clearPosts } from '../actions'
import Header from './Header'
import PostInfo from './PostInfo'
import Categories from './Categories'

class Posts extends Component {

  state = {
    loaded: false,
    sort: 'date',
  }
  
  onChangeSortOrder(sortOption) {
     this.setState({ 
         sort: sortOption 
     })
  }

  componentDidMount() {
    if (this.props.posts.length > 0) {
      this.props.clearPosts()
    }
    this.props.getPosts()
      .then(() => {
        this.setState({
          loaded: true
        })
      })
  }

  render() {
    const { posts, match } = this.props
    const { loaded, sort } = this.state
    
    const filteredPosts = posts.filter(post => {
      if(match.params.category) {
        return !post.deleted && post.category === match.params.category
      } else {
        return !post.deleted 
      }
    })

    let sortedPosts
    if (sort === "rating") {
        sortedPosts = filteredPosts.sort((a, b) => {
            if(a.voteScore > b.voteScore) {
                return -1
            } else {
                return 1
            }
        }).map(post => (<PostInfo key={post.id} post={post} singlePost={false} />))
    }
    else{
        sortedPosts = filteredPosts.sort((a, b) => {
          if(a.timestamp < b.timestamp) {
            return 1
          } else {
            return -1
          }
        }).map(post => (<PostInfo key={post.id} post={post} singlePost={false} />))
    }
        
    return(
    <div className="page-container">
          <Header/>
            {loaded && 
                <div className="all-content-container">
                    <div className="side-content-container">
                         <Categories/>
                          <div className="sort-container">
                            <div className="sort-text">Sort By: </div>
                            <select value={sort} onChange={(e) => this.onChangeSortOrder(e.target.value)}>
                                <option value="date">Date</option>
                                <option value="rating">Rating</option>
                            </select>
                          </div>
                    </div>
                    <div className="content-container">
                            {sortedPosts}
                    </div>
                </div>
            }
      </div>
    )    
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    posts: posts.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(fetchPosts()),
    clearPosts: () => dispatch(clearPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)