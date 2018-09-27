import { combineReducers } from "redux";
import posts from "./posts";
import authors from "./authors";
import comments from "./comments";

import * as postsActions from "../actions/posts";
import * as authorsActions from "../actions/authors";
import * as commentsActions from "../actions/comments";

export const actionsBank = {
  posts: postsActions,
  authors: authorsActions,
  comments: commentsActions
};

const rootReducer = combineReducers({
  posts,
  authors,
  comments
});
export default rootReducer;
