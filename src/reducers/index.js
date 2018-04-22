import { combineReducers } from 'redux'
import posts from './posts'
import authors from './authors'
import comments from './comments'

const rootReducer = combineReducers({
posts,
authors,
comments
})
export default rootReducer
