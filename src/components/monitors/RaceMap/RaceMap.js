import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Map,Marker,Polyline,GoogleApiWrapper } from 'google-maps-react';
import './RaceMap.css'

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const DEFAULT_ZOOM = parseInt(process.env.REACT_APP_DEFAULT_ZOOM);
const TRAIL_MAX_POINTS = parseInt(process.env.REACT_APP_MAP_TRAIL_MAX_POINTS);


const GRIIIP_HOME={lat: 32.105208,lng:34.898308}
const DEFAULT_LOCATION = GRIIIP_HOME;

const MARKING_COLOR = "#e90344"


const mapStyles = {
    width: '100%',
    height: '100%',
    margin: 0,
    paddin:0
  };

  

  const mapStateToProps = (state, ownProps) => {


    const last = state.last;
    let newLocation;

    if(last){
        newLocation =  {lat: parseFloat(last["gps_lat"]),lng: parseFloat(last["gps_long"])};
      }else{
          newLocation = DEFAULT_LOCATION;
        }

        const lastValues = state.data.slice(-TRAIL_MAX_POINTS).map((data)=>{
          return {lat: parseFloat(data["gps_lat"]),lng: parseFloat(data["gps_long"])};

        }); 

    
        return {location: newLocation ,trail:lastValues}
    }


class MapContainer extends Component {
    render() {

      return (<div className="map">
        <Map
          google={this.props.google}
          zoom={DEFAULT_ZOOM}
          style={mapStyles}
          mapType="SATELLITE"
          fullscreenControl={false}
          streetViewControl={false}
          zoomControl = {false}
          
          mapTypeControl={false}
          initialCenter={DEFAULT_LOCATION}
          center = {this.props.location}
        >
        <Marker
    name={'Your position'}
    position={this.props.location}
    icon={{
      path: this.props.google.maps.SymbolPath.CIRCLE,
      fillColor: MARKING_COLOR,
      fillOpacity: 0.9,
      strokeColor: 'black',
      strokeOpacity: 0.9,
      strokeWeight: 1,
      scale: 3
  }}
    />
<Polyline
  path={this.props.trail} 
  options={{ 
  strokeColor: '#201a2d',
  strokeOpacity: 0.8,
  strokeWeight: 4
}}
/>
        </Map>
      </div>);
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        
    }
}

  export default GoogleApiWrapper({
    apiKey: GOOGLE_API_KEY
  })(connect(mapStateToProps)(MapContainer));