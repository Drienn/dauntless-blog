import React, { Component } from 'react'
import { Route, Switch, withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import logo from './logo.svg'
import './App.css'

import * as PostActions from './actions/posts'
import * as AuthorActions from './actions/authors'
import * as CommentActions from './actions/comments'

import Home from './containers/Home/'
import Preview from './containers/Preview/'
import Author from './containers/Author/'
import NewPost from './containers/NewPost/'
import NoMatch from './containers/NoMatch'

class App extends Component {

  componentDidMount() {
    if (this.props.history.action === 'POP') {
      this.props.PostActions.getPosts()
      this.props.AuthorActions.getAuthors()
      this.props.CommentActions.getComments()
    }
  }

  homeButtonClick(e){
    e.preventDefault()
    console.log('pop?', this.props.history)
    this.props.history.replace('/')
  }

  render() {
    return (
      <div className="App container">
        { this.props.history.location.pathname === '/' ? null :
          <header>
          <button onClick={(e) => this.homeButtonClick(e)} className='btn btn-success left'>Home</button>
        </header>
      }
        <Switch>
          <Route exact path="/post/new" component={NewPost}/>
          <Route exact path="/post/notFound" component={NoMatch}/>
          <Route exact path="/post/:id" component={Preview}/>
          <Route path="/author/:authorName" component={Author}/>
          <Route exact path="/" component={Home}/>
          <Route component={NoMatch}/>
        </Switch>

      </div>
    )
  }
}

//Redux conversation between Component and Store//
  function mapStateToProps (state) {
    return {

    }
  }
function mapDispatchToProps(dispatch) {
  return {
      PostActions: bindActionCreators(PostActions, dispatch),
      AuthorActions: bindActionCreators(AuthorActions, dispatch),
      CommentActions: bindActionCreators(CommentActions, dispatch)
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
