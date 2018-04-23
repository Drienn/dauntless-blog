import React from 'react'
import './Post.css'
import { Link } from 'react-router-dom'

const Post = (props) => {
  let { id, title, body, comments, history, author } = props

  let name = author && author.name ? author.name : 'Anonymous'

  let titleTooLong = title.length > 15
  let bodyTooLong = body.length > 30

  let reducedTitle = titleTooLong ? title.slice(0, 15) : title
  let reducedBody = bodyTooLong ? body.slice(0, 30) : body

  return (
    <div className='post-container'>
      <img className='thumnail' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzN-LJrUK-jquxYcFl_G60XFXtkjbmzfXq31rTU4N_n__B08mc'/>
      <h3>{titleTooLong ? `${reducedTitle}...` : title}</h3>
      <p>{bodyTooLong ? `${reducedBody}...` : body}</p>
      <span>Posted by:{' '}
        { name !== 'Anonymous' ?
         <Link to={`/author/${name}`}>{name}</Link>
         :
         <a>{name}</a>
      }
      </span>

      <p className='comment-title'> {comments.length} Comments</p>

      <Link className='preview-btn btn btn-info' to={{
        pathname: `/post/${id}`,
        state: {title, body, comments}
      }}>View Post</Link>
    </div>
  )
}

export default Post
