import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

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

    this.setState({currentAuthor})
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
      <div>
        <p>{name}'s Author Page!</p>
        <p>UserName: {username}</p>
        <p>Email: {email}</p>
        <p>Website: {website}</p>
        <p>Address: {street} {suite}, {city} {zipcode}</p>
        <p>Company:</p>
        <p>Name: {companyName}</p>
        <p>Catch Phrase: {catchPhrase}</p>
        <p>Bs: {bs}</p>
        <p> lat: {lat}, lng: {lng} </p>

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
