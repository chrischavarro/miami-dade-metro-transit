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

  onGetLocation(location, error) {
    $('#loading_spinner').hide();
    console.log(location);
    this.setState({
      should_show: true,
      location: location 
    });
  }

  onSearchSubmit() {
    var search_query = $('#pac-input').val();
    location.replace('/search?origin' + this.state.location);
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
      <div>
        <hr />
        <div  id="locationform" style={style}>
          <input className="where_are_you_going" id="pac-input" onKeyPress={this.onInputKeypress.bind(this)}/>
          <button className="submit_search" id="search_submit" onClick={this.onSearchSubmit}>Search</button>
        </div>
      </div> 
    );
  }
}
