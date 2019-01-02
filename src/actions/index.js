import axios from 'axios'

export const C = {
   FETCH_POSTS: 'FETCH_POSTS',
   CREATE_POST: 'CREATE_POST',
   FETCH_POST: 'FETCH_POST',
   DELETE_POST: 'DELETE_POST'
}

// create a post: http://reduxblog.herokuapp.com/api/posts?key=BBM
// delete a post: http://reduxblog.herokuapp.com/api/posts/:id?key=BBM
// get all posts: http://reduxblog.herokuapp.com/api/posts?key=BBM
// get a post:    http://reduxblog.herokuapp.com/api/posts/:id?key=BBM

const ROOT_URL = 'http://reduxblog.herokuapp.com/api'
const API_KEY = '?key=BBM'

export const fetchPosts = () => {
   const req = axios.get(`${ROOT_URL}/posts${API_KEY}`)
   return {
      type: C.FETCH_POSTS,
      payload: req
   }
}

export const createPost = (post, callback) => {
   const req = axios
      .post(`${ROOT_URL}/posts${API_KEY}`, post)
      .then(() => callback())
   return {
      type: C.CREATE_POST,
      payload: req
   }
}

export const fetchPost = (id) => {
   const req = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)
   return {
      type: C.FETCH_POST,
      payload: req
   }
}

export const deletePost = (id, callback) => {
   const req = axios
      .delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
      .then(() => callback())
   return {
      type: C.DELETE_POST,
      payload: req,
      id
   }
}