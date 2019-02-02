import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Fab from "@material-ui/core/Fab";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

const styles = theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 500
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10,
    backgroundColor: "#000000",
    color: "#ffffff",
    margin: 4
  }
});
class SearchPlaces extends Component {
  constructor(props) {
    super(props);

    this.state = {
      place: "",
      address: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(address) {
    this.setState({ address: address });
  }

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .then(this.setState({ address }))
      .then(() => {
        if (!this.props.isSearch) {
          this.props.onReceive(address);
        }
      })
      .catch(error => console.error("Error", error));
  };

  onSubmit(e) {
    const searchObject = { search: this.state.address };

    axios
      .post("/api/search", searchObject)
      .then(res => {
        console.log(res.data.search);
        this.props.onReceive(res.data.search);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes, isSearch } = this.props;
    return (
      // Access Date: 01-01-2019
      // REF: https://github.com/hibiken/react-places-autocomplete
      <div className={classes.root} elevation={1}>
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
              <div style={{ display: "flex", flexDirection: "row" }}>
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input"
                  })}
                  style={{
                    padding: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 500
                  }}
                />

                {isSearch ? (
                  <div onClick={this.onSubmit} style={{ marginLeft: 8 }}>
                    <Fab color="primary" className={classes.fab} size={"small"}>
                      <SearchIcon />
                    </Fab>
                  </div>
                ) : null}
              </div>
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
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
      </div>
    );
  }
}

SearchPlaces.propTypes = {
  classes: PropTypes.object.isRequired,
  onReceive: PropTypes.func,
  isSearch: PropTypes.bool
};
export default withStyles(styles)(SearchPlaces);
