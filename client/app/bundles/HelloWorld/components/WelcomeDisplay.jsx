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

  onGetLocation(location, error) {
    console.log(location);
    this.setState({
      should_show: true,
      location: location 
    });
  }

  render() {
    if (!this.state.should_show) {
      var style = {
        display: 'none'
      };
    }
    else {
      var style = {
        display: 'block'
      };
    }
    if (!this.state.location) {
      this.getGPSLocation();
    }
    const { name } = this.props;
    return (
      <div className="container">
        <div className='lets_get_movin' >
          Let's get you movin!
        </div>
        <hr />
        <div  id="locationform" style={style}>
          <input className=" where_are_you_going" />
          <button className="submit_search" id="search_submit">Search</button>
        </div>
      </div> 
    );
  }
}
