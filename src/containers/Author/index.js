import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import './Author.css'

/* global google */

const MapWithAMarker = withGoogleMap(({lat, lng}) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: parseInt(lat), lng: parseInt(lng) }}
  >
    <Marker
      position={{ lat: parseInt(lat), lng: parseInt(lng)}}
    />
  </GoogleMap>
)



class Author extends Component {
  constructor(){
    super()

    this.state = {
      currentAuthor: {}
    }
  }

  findCurrentAuthor = (authors) => {
    let [currentAuthor] = authors ? authors.filter(({name}) => name === this.props.match.params.authorName) : []

    this.setState({currentAuthor}, () => currentAuthor === undefined ? this.props.history.push('/author/notFound') : console.log('Found Author!'))
  }

  componentWillReceiveProps(nextProps){
    this.findCurrentAuthor(nextProps.authors)
  }

  componentDidMount(){
    this.findCurrentAuthor(this.props.authors)
  }

  render() {
    let {name, username, email, address, phone, website, company } = this.state.currentAuthor ? this.state.currentAuthor : 'loading'
    let { street, suite, city, zipcode, geo } = address ? address : 'loading'
    let { lat, lng} = address && geo && geo.lat ? geo : 'loading'
    let { name: companyName, catchPhrase, bs } = company ? company : 'loading'

    return (
      <div className='author-container'>
        <h2 className='bold center'>{name}'s Author Page!</h2>
        <div className='author-details'>
          <p><span className='bold'>UserName:</span> {username}</p>
          <p><span className='bold'>Email:</span> {email}</p>
          <p><span className='bold'>Website:</span> {website}</p>
          <p><span className='bold'>Address:</span> {street} {suite}, {city} {zipcode}</p>
          <p><span className='bold'>Company:</span></p>
          <p><span className='bold'>Name:</span> {companyName}</p>
          <p><span className='bold'>Catch Phrase:</span> {catchPhrase}</p>
          <p><span className='bold'>Bs:</span> {bs}</p>
          <p><span className='bold'> lat:</span> {lat}</p>
          <p><span className='bold'> lng:</span> {lng}</p>
        </div>
        {
          lat && lng ?
          <MapWithAMarker
            lat={lat}
            lng={lng}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
          :
          null
        }

      </div>
    )
  }
}

//Redux conversation between Component and Store//
  function mapStateToProps ({authors}) {
    return {
      authors
    }
  }
function mapDispatchToProps(dispatch) {
  return {
      //Placeholder: bindActionCreators(Placeholder, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Author)
