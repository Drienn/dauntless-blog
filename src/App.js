import React, { Component } from "react";
import { Route, Switch, withRouter, Link } from "react-router-dom";
import "./App.css";

import { actionsBank } from "./reducers/";
import withRedux from "with-redux-hoc";

import Home from "./containers/Home/";
import Preview from "./containers/Preview/";
import Author from "./containers/Author/";
import NewPost from "./containers/NewPost/";
import NoMatch from "./containers/NoMatch";

class App extends Component {
  componentDidMount() {
    const {
      history: { action },
      postsActions: { getPosts },
      authorsActions: { getAuthors },
      commentsActions: { getComments }
    } = this.props;

    if (action === "POP") {
      getPosts();
      getAuthors();
      getComments();
    }
  }

  homeButtonClick(e) {
    e.preventDefault();
    console.log("pop?", this.props.history);
    this.props.history.replace("/");
  }

  render() {
    const { pathname } = this.props.history.location;
    return (
      <div className="App container">
        {pathname === "/" ? null : (
          <header>
            <button onClick={e => this.homeButtonClick(e)} className="btn btn-success left">
              Home
            </button>
          </header>
        )}
        <Switch>
          <Route exact path="/post/new" component={NewPost} />
          <Route exact path="/post/notFound" component={NoMatch} />
          <Route exact path="/post/:id" component={Preview} />
          <Route path="/author/notFound" component={NoMatch} />
          <Route path="/author/:authorName" component={Author} />
          <Route exact path="/" component={Home} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

const reduxActions = {
  posts: ["getPosts"],
  authors: ["getAuthors"],
  comments: ["getComments"]
};

export default withRouter(withRedux(["authors", "posts", "comments"], actionsBank, App, false, reduxActions));
