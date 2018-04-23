import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import heroImage from './hero-image.png'
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
        commentAuthor: '',
        showAddComment: false,
        redirectCounter: 0
      }
  }

 initPreview(){
  let { posts, authors, comments, match, history } = this.props
  let { redirectCounter, post } = this.state

  let [currentPost] = posts.filter(({id}) => id === +match.params.id) || 'notFound'

  if (currentPost === undefined && !post) this.setState({redirectCounter: redirectCounter + 1})

  if (redirectCounter > 2 && currentPost === undefined) {
    this.setState({redirectCounter: 0})
    return history.push('/post/notFound')
  }

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
    field === 'commentBody' ?
    this.setState({commentBody: value}) :
    this.setState({commentAuthor: value})
  }

  submitComment(e){
    e.preventDefault()

    let { showAddComment, commentTitle, commentBody, commentAuthor, post } = this.state
    if (commentBody === '') return alert(`Comment Can't Be Blank`)
    this.setState({showAddComment: !showAddComment, commentTitle: '', commentBody: '', commentAuthor: ''})

    this.props.CommentActions.addComment({name: commentTitle, body: commentBody, postId: post.id, email: commentAuthor ? commentAuthor : 'Anonymous'})
  }

  renderComments = arr => arr.slice(0,5).map(({name, title, email, body}, i) => <div key={i} className='card'>
    <p className='comment-name'>{name ? name : ''}</p>
    <p className='body'>{body}</p>
    <p><span className='comment-email'>~</span> {email ? email : 'Anonymous'}</p>
    <hr/>
  </div>)

  componentWillReceiveProps(nextProps){
    this.initPreview()
  }

  componentDidMount(){
    this.initPreview()
  }

  render() {
    let { post, author, showAddComment, commentTitle, commentBody, commentAuthor } = this.state
    let { title, body } = post && post.title ? post : 'loading...'
    let { name: authorName, website } = author && author.name ? author : 'loading...'

    console.log('authorName', authorName)
    return (
      <div>
        <img className='hero-image' src={heroImage} alt="Card image"/>
        <p>
          <span className='title'>Author: </span>
          { authorName ?
           <Link to={`/author/${authorName}`}>{authorName}</Link>
           :
           <span>Anonymous</span>
        }
         </p>
        <h3 className='title'>{title}</h3>

        <div className='body'>
          <span>{body}</span>
        </div>

          <button className='add-comment btn btn-info'
             onClick={() => !showAddComment ? this.setState({showAddComment: !showAddComment}) : this.setState({showAddComment: !showAddComment, commentTitle: '', commentBody: '', commentAuthor: ''})}>{ !showAddComment ? `Add Comment` : `Nevermind!`}
           </button>
             { showAddComment ? <div>
               {/* <form className='form-group form'> */}
                 {/* <label className="col-sm-2 col-form-label">Title</label> */}
                 <input className="form-control" placeholder="Add Title (Optional)"
                   value={commentTitle}
                   onChange={(e) => this.updateField(e, 'commentTitle')}/>

                 {/* <label className="col-sm-2 col-form-label">Body</label> */}
                 <textarea className="form-control add-comment-body" placeholder="Add Content"
                   value={commentBody}
                   onChange={(e) => this.updateField(e, 'commentBody')}/>

                   <input className="form-control add-comment-title" placeholder="Add Name (Optional)"
                     value={commentAuthor}
                     onChange={(e) => this.updateField(e, 'commentAuthor')}/>

                   <button onClick={(e) => this.submitComment(e)}className='submit-comment btn btn-outline-success'>Add Comment</button>
               {/* </form> */}
               </div>
               :
               null
             }

        <p>Comments:</p>
        <hr/>
        {this.props.comments && post ? this.renderComments(this.props.comments.filter(({postId}) => postId === post.id)): <p>No Comments</p>}
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
