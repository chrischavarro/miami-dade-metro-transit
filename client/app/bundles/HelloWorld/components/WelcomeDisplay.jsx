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
      location: false
    };
  }

  // React will automatically provide us with the event `e`
  handleChange() {
  }

  getGPSLocation() {
    navigator.geolocation.getCurrentPosition(this.onGetLocation.bind(this));
  }

  onGetBusData(data) {
    console.log(data);
    global_location = this.state.location.coords;
    console.log("COORDS", global_location)
    initMap(this.state.location.coords, data.bus_data);
  }

  onGetLocation(location, error) {
    console.log(location);
    this.setState({
      location: location 
    });
    $.get('/search?origin=' + location.coords.latitude + ',' + location.coords.longitude, this.onGetBusData.bind(this));
  }


  render() {
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
