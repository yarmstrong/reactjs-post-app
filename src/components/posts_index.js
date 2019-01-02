import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import { Link } from 'react-router-dom'
import _ from 'lodash'

class Posts extends Component {
   componentDidMount() {
      this.props.fetchPosts()
      /** enhance it: if state.posts is already populated (unless route came 
         from createPost), no need to re-fetch the list of posts */
   }
   renderPosts() {
      return _.map(this.props.posts, post => {
         return (
            <li key={post.id} className="list-group-item">
               <Link to={`/posts/${post.id}`}>
                  {post.title}
               </Link>
            </li>
         )
      })
   }
   render() {
      if (!this.props.posts) {
         return <div>Loading...</div>
      }
      return (
         <div>
            <div className="text-md-right">
               <Link to="/posts/new" className="btn btn-primary">
                  Create New Post
               </Link>
            </div>
            <h3>Posts</h3>
            <ul className="list-group">
               {this.renderPosts()}
            </ul>
         </div>
      )
   }
}

export default connect(
   state => ({ posts: state.posts }),
   { fetchPosts }
)(Posts)