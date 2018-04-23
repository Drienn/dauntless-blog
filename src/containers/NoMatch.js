import React from 'react'

const NoMatch = ({ location: { pathname: path } }) => {
  console.log('noMatch props', path)
  let context = path === '/author/notFound' ? 'Author' : path === '/post/notFound' ? 'Post' : 'Page'
  return (
    <h2>Sorry, We Couldn't Find The {context} You Were Looking For.</h2>
  )
}

export default NoMatch
