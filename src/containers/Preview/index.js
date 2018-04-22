import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Preview.css'

import * as CommentActions from '../../actions/comments'

class Preview extends Component {
  constructor(){
    super()
      this.state = {
        post: false,
        author: false,
        comments: false,
        commentTitle: '',
        commentBody: '',
        showAddComment: false
      }
  }

 initPreview(){
  let { posts, authors, comments, match } = this.props

  let [currentPost] = posts.filter(({id}) => id === +match.params.id)
  let [currentAuthor] = currentPost ? authors.filter(({id}) => id === currentPost.userId) : []

  let currentComments = comments.filter(comment => comment.postId === +match.params.id)

    this.setState({
      post: currentPost,
      author: currentAuthor,
      comments: currentComments
    })
  }

  updateField({target: { value }}, field){
    field === 'commentTitle' ?
    this.setState({commentTitle: value}) :
    this.setState({commentBody: value})
  }

  submitComment(e){
    e.preventDefault()

    let { showAddComment, commentBody, post } = this.state
    if (commentBody === '') return alert(`Comment Can't Be Blank`)
    this.setState({showAddComment: !showAddComment, commentBody: ''})

    this.props.CommentActions.addComment({body: commentBody, postId: post.id, email: 'Anonymous'})
  }

  renderComments = arr => arr.slice(0,5).map(({name, title, email, body}, i) => <div key={i} className='card'>
    <p><span className='title'>Comment Name: </span> {name ? name : 'Anonymous'}</p>
    <p><span className='title'>Comment Body: </span> {body}</p>
    <p><span className='title'>Comment Email: </span> {email}</p>
    <hr/>
  </div>)

  componentWillReceiveProps(nextProps){
    this.initPreview()
  }

  componentDidMount(){
    this.initPreview()
  }

  render() {
    let { post, author, showAddComment, commentBody } = this.state
    let { title, body } = post && post.title ? post : 'loading...'
    let { name: authorName, website } = author && author.name ? author : 'loading...'

    return (
      <div>
        <img className='hero-image' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAd0AAABqCAMAAADOW3slAAAANlBMVEXMzMyUlJTPz8+SkpLJycm0tLScnJyWlpbGxsapqanAwMCsrKygoKDExMSZmZm5ubmkpKS2trY13R2VAAADgUlEQVR4nO3a3XLbOAyGYRGkRIr69f3f7AKgZXtitTt7kuXB+7TjqLKUaeYzSJDKMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0CERuY6GMryOU3qfTq/TP2/9L1fj9z3yvudkR2WNMa5luI736inJEmJY7gKTdV/tvNQpxmlr58Yc4/w7/3X8GxljyNHTzTkH/eM55hD0tAUmS9STcb6Jt8Y82emit+lf+ybysKvDSfX2YTvmlu4R8lnOHA6LPIRR/22VmfRLXXMsX3fKmT1dmUM49A6rbwl5qmeO9fd/ENyRR7B0dQAORTYfhGUNk1hoyUKPm50ev8pRS7ala7Uqa971uGrQksL9SI7fp4Xq6WqYVqmerr8eIVQPXWyk/hqa9YbV0y0hPMRm5+RFr6+7Vz06cKW7vNMtXqrVUzu1jAeZPC/xPqu1T3rputh7dl21EcBe55Ct28qZdPtwpTvayPzKVWdfP5YprDZU27irHZieKGFtt8Vj9uS1xjcbwfUe/SzYdT4MoAfPdAefcnV8LcOVrtWx7NYAWwPlY3EcSw67d8dany3d0dNtlb76mTZjowNXurpStQWRdU8+49oorZNtfqfro/cV7iMu73TbJ8Iq3WZib9D+558KzZXuUCZd8a5tcXSfrs+re7tr0lb6Lt2VdHtypWsLHA2xrYK+07WZVIq+39ZGNa5Cuv376JmreEZ36VovPOicO+nMPFqbFY/7dBmZu3Kle/oyxsP8U1c1xT3JEuM2JO2nx4d20o/0Tpeuqj9Xur41oWGuH+mO0k48d6LS6tseh1i6MUadp2Oxle727LNZEfXmSndq2xYWpq50HzJsH9Xobw7t0Z69pHlRU96XJG0cP567GftrGEAHXrXrZecD8RDfO5FzyHc7kWJ83rUa1zl4/NiJ9I8IevBzn3l+VrD1RsmfMVxbWF93tnQ1+sV2LPNzpSwDTxG6caWr0+cyzD7jev+csu8ta7CzbVLdNMHPdDXYUGpo1R3zaRtePAHsxGs3Q9eyMbQZMwU9bk9praZjuH0ef9XuFu3pvedvz/r16onS7YSMsaW77doIT61Ga46vwfjU0+vtnWfcvdc6tIHOR2u5ZvsmrIf6I1vdXkW31esX4aTU8vda1DVUvX5VTtLHNwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoCv/ANSoGfK5GgonAAAAAElFTkSuQmCC' alt="Card image"/>
        <p>
          <span className='title'>Author: </span>
          { authorName !== 'Anonymous' ?
           <Link to={`/author/${authorName}`}>{authorName}</Link>
           :
           <a>Anonymous</a>
        }
         </p>
        <p>
          <span className='title'>Title:</span>
           {title}
         </p>
        <p>
          <span className='title'>Body:
          </span>
          {body}
        </p>

          <button className='add-comment btn btn-info'
             onClick={() => !showAddComment ? this.setState({showAddComment: !showAddComment}) : this.setState({showAddComment: !showAddComment, commentBody: ''})}>{ !showAddComment ? `Add Comment` : `Nevermind!`}
           </button>
             { showAddComment ? <div>
               {/* <form className='form-group form'> */}
                 {/* <label className="col-sm-2 col-form-label">Title</label>
                 <input className="form-control" placeholder="Add Title"
                   value={commentTitle}
                   onChange={(e) => this.updateField(e, 'commentTitle')}/> */}

                 {/* <label className="col-sm-2 col-form-label">Body</label> */}
                 <textarea className="form-control" placeholder="Add Content"
                   value={commentBody}
                   onChange={(e) => this.updateField(e, 'commentBody')}/>

                   <button onClick={(e) => this.submitComment(e)}className='submit-comment btn btn-primary'>Add Comment</button>
               {/* </form> */}
               </div>
               :
               null
             }

        <p>Comments:</p>
        <hr/>
        {this.props.comments ? this.renderComments(this.props.comments.filter(({postId}) => postId === post.id)): <p>No Comments</p>}
      </div>
    )
  }
}

//Redux conversation between Component and Store//
  function mapStateToProps ({posts, authors, comments}) {
    return {
      posts,
      authors,
      comments
    }
  }
function mapDispatchToProps(dispatch) {
  return {
      CommentActions: bindActionCreators(CommentActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Preview);
