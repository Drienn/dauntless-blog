import axios from 'axios'

const getPosts = () => {
  return {
    type: 'FETCH_POSTS',
    payload: axios(`https://jsonplaceholder.typicode.com/posts`)
  }
}

const addPost = (post) => {
  return {
    type: 'ADD_POST',
    payload: axios.post(`https://jsonplaceholder.typicode.com/posts`, post)
  }
}

export {
  getPosts,
  addPost
}
