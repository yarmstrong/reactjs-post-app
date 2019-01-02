import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPost, deletePost } from '../actions'

class ShowPost extends Component {
   componentDidMount() {
      if (!this.props.post) {
         console.log('direct population of specific post')
         this.props.fetchPost(this.props.match.params.id)
      }
   }
   onDeletePost() {
      this.props.deletePost(this.props.match.params.id, () => {
         this.props.history.push('/')
      })
   }
   render() {
      const { post } = this.props
      if (!post) {
         return <div>Loading...</div>
      }
      return (
         <div>
            <Link to="/">Back to Index</Link>
            <h3>{post.title}</h3>
            <h6>Categories: {post.categories}</h6>
            <p>{post.content}</p>
            <button 
               className="btn btn-danger pull-md-right"
               onClick={this.onDeletePost.bind(this)}
            >
               Delete Post
            </button>
         </div>
      )
   }
}

export default connect(
   (state, ownProps) => ({
      post: state.posts[ownProps.match.params.id]
   }),
   { fetchPost, deletePost }
)(ShowPost)
