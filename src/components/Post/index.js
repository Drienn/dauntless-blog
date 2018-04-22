import React from 'react'
import './Post.css'
import { Link } from 'react-router-dom'

// const renderComments = (comments) => {
//   return comments.map((comment, i) =>
//   <div key={i} className="comments-container">
//     <div className="comment">
//       <p className='comment-name'>Name: {comment.name}</p>
//       <p className='comment-body'>{comment.body}</p>
//     </div>
//   </div>
// )}

const Post = (props) => {
  let { id, title, body, comments, history, author } = props

  let name = author && author.name ? author.name : 'Anonymous'

  let titleTooLong = title.length > 15
  let bodyTooLong = body.length > 30

  let reducedTitle = titleTooLong ? title.slice(0, 15) : title
  let reducedBody = bodyTooLong ? body.slice(0, 30) : body

  return (
    <div className='post-container'>
      <span>by: <Link to={`/author/${name}`}>{name}</Link></span>
      <h3>{titleTooLong ? `${reducedTitle}...` : title}</h3>
      <p>{bodyTooLong ? `${reducedBody}...` : body}</p>

      <span className='comment-title'> {comments.length} Comments</span>

      <Link className='preview-btn btn btn-info' to={{
        pathname: `/post/${id}`,
        state: {title, body, comments}
      }}>View Post</Link>
    </div>
  )
}

export default Post
