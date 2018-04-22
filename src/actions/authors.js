import axios from 'axios'

export const getAuthors = () => {
  return {
    type: 'FETCH_AUTHORS',
    payload: axios(`https://jsonplaceholder.typicode.com/users`)
  }
}
