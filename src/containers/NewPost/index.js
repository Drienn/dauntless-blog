import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as PostActions from '../../actions/posts'
import './NewPost.css'

class NewPost extends Component {
  constructor(){
    super()

    this.createPost = this.createPost.bind(this)

    this.state = {
      title: '',
      body: ''
    }
  }

  createPost(){
    let { title, body } = this.state
    let { push } = this.props.history

    if (title.length === 0 || body.length === 0) return alert('Title and Body cannot be blank')

    this.props.PostActions.addPost({userId: 0, title, body})
    push('/')
  }

  updateField({target: { value }}, field){
    field === 'title' ?
    this.setState({title: value}) :
    this.setState({body: value})
  }


  render() {
    let { title, body } = this.state
    return (
      <div>
        <h1>Create A Post</h1>

        <form className='form-group form'>
          <label className="col-sm-2 col-form-label">Title</label>
          <input className="form-control" placeholder="Add Title"
            value={title}
            onChange={(e) => this.updateField(e, 'title')}/>

          <label className="col-sm-2 col-form-label">Body</label>
          <textarea className="form-control" placeholder="Add Content"
            value={body}
            onChange={(e) => this.updateField(e, 'body')}/>

        </form>
        {/* <Link className='btn btn-info' to='/'>Add Post</Link> */}
        <button className="btn btn-info" onClick={this.createPost}>Add Post</button>

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
      PostActions: bindActionCreators(PostActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewPost)
