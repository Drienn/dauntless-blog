import axios from 'axios'

const getComments = () => {
  return {
    type: 'FETCH_COMMENTS',
    payload: axios(`https://jsonplaceholder.typicode.com/comments`)
  }
}

const addComment = (comment) => {
  return {
    type: 'ADD_COMMENTS',
    payload: axios.post(`https://jsonplaceholder.typicode.com/comments`, comment)
  }
}


export {
  getComments,
  addComment
}
