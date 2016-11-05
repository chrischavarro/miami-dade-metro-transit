// HelloWorldWidget is an arbitrary name for any "dumb" component. We do not recommend suffixing
// all your dumb component names with Widget.

import React, { PropTypes } from 'react';

// Simple example of a React "dumb" component
export default class WelcomeDisplay extends React.Component {
  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: "data" and "actions".
    updateName: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      should_show: false,
      location: false
    };
  }

  // React will automatically provide us with the event `e`
  handleChange() {
  }

  getGPSLocation() {
    navigator.geolocation.getCurrentPosition(this.onGetLocation.bind(this));
  }

  onInputKeypress(event) {
    if(event.key == 'Enter'){
      this.onSearchSubmit();
    }
  }

  onGetBusData(data) {
    // console.log(data)
    // Passes data to initMap function in application.js
    initMap(this.state.location.coords, data.bus_data);
  }

  onGetLocation(location, error) {
    $('#loading_spinner').hide();
    console.log(location);
    this.setState({
      should_show: true,
      location: location 
    });
    $.get('/search?origin' + location.coords.lattitude + ',' + location.coords.longitude, this.onGetBusData.bind(this))
  }

  onSearchSubmit() {
    var places_data = places_autocomplete.getPlace();
    if (!places_data) {
      return;
    }
    var search_query = $('#pac-input').val();
    var user_coords = this.state.location.coords.latitude + ',' + this.state.location.coords.longitude;
    var dest_coords = places_autocomplete.getPlace().geometry.location.lat() + ',' + places_autocomplete.getPlace().geometry.location.lng();
    console.log("Origin coords", user_coords);
    console.log("Dest coords", dest_coords);
    location.replace('/search?origin=' + user_coords +'&destination=' + dest_coords);
  }

  render() {
    if (!this.state.should_show) {
      var style = {
        height: '0px',
        transition: '0.5s',
        opacity: 0
      };
    }
    else {
      var style = {
        height: 'auto',
        transition: '0.5s',
        opacity: 1
      };
    }
    if (!this.state.location) {
      this.getGPSLocation();
    }
    const { name } = this.props;
    return (
      <div>

      </div> 
    );
  }
}
// Input field to get coordinates
//         <div  id="locationform" style={style}>
          // <input className="full where_are_you_going" placeholder="Enter your destination" id="pac-input" onKeyPress={this.onInputKeypress.bind(this)}/>
          // <button className="submit_search blue big_btn" id="search_submit" onClick={this.onSearchSubmit.bind(this)}>Search</button>
        // </div>