import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { incrementCounter, decrementCounter } from "./testActions";
import Script from "react-load-script";
import GoogleMapReact from "google-map-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

const mapState = state => ({
  data: state.test.data
});

const actions = {
  incrementCounter,
  decrementCounter
};

const Marker = () => <Icon name="marker" size="big" color="red" />;

class TestComponent extends Component {
  state = {
    address: "",
    scriptLoaded: false
  };

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  handleScriptLoad = () => {
    this.setState({ scriptLoaded: true });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };

  handleChange = address => this.setState({ address });

  render() {
    const { incrementCounter, decrementCounter, data } = this.props;
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDbBPSDFMpZFPyUgjPp5MASg000quHihsc&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} color="green" content="Increment" />
        <Button onClick={decrementCounter} color="red" content="Decrement" />
        <br />
        <br />
        {this.state.scriptLoaded && (
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input"
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        )}

        <div style={{ height: "300px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDbBPSDFMpZFPyUgjPp5MASg000quHihsc"
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <Marker lat={59.955413} lng={30.337844} text="My Marker" />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(TestComponent);
