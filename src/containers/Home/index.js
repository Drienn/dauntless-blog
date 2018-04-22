import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Post from '../../components/Post/'
import './Home.css'

class Home extends Component {
  constructor() {
    super()

    this.dismissFlash = this.dismissFlash.bind(this)

    this.state = {
      showSuccessFlash: true,
      flashStyle: ''
    }
  }

  dismissFlash(){
    this.setState({showSuccessFlash: false})
  }

  componentDidMount() {
    setTimeout(this.dismissFlash, 3000)
  }

  renderSuccessFlash = () => <div className={`fade flash alert alert-dismissible alert-success`}>
  <button onClick={this.dismissFlash} type="button" className="close" data-dismiss="alert">&times;
  </button>
  Post Added!
</div>

  renderPosts = (history) => this.props.posts.map((post, i) => {
    let comments = this.props.comments.filter(comment => comment.postId === post.id)
    let [author] = this.props.authors.filter(({id}) => id === post.userId)
    return (<Post key={i} {...post} comments={comments} history={history} author={author}/>)
  })

  render() {
    let { showSuccessFlash } = this.state
    let { action } = this.props.history

    let showFlash = showSuccessFlash && action === 'PUSH'
    return (
      <div>
        { showFlash ? this.renderSuccessFlash() : null }
        <h1>Welcome To The Dauntless Blog</h1>
        <Link className={`${showFlash ? 'moveDown' : ''} add-post btn btn-primary`} to='/post/new'>Add Post</Link>
        { this.renderPosts(this.props.history) }
      </div>
    )
  }
}

//Redux conversation between Component and Store//
  function mapStateToProps (state) {
    return {
      posts: state.posts,
      comments: state.comments,
      authors: state.authors
    }
  }
function mapDispatchToProps(dispatch) {
  return {
      //HomeActions: bindActionCreators(HomeActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
