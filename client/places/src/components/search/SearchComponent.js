import React, { Component } from "react";
import CardItem from "../CardItem";
import SearchPlaces from "./SearchPlaces";
import Typography from "@material-ui/core/Typography";
import ReactPaginate from "react-paginate";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../store";
import PropTypes from "prop-types";

function NoSearchAvailable() {
  return (
    <div
      style={{
        alignSelf: "center",
        widht: 350,
        height: 200
      }}
    >
      <Typography variant="display2" style={{ marginTop: 32, fontSize: 24 }}>
        No Result Found!
      </Typography>
    </div>
  );
}

var count = 0;
class SearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: null,
      moreItems: null,
      pageCount: null,
      isNoSearchResults: false,
      isAuthenticated: false
    };

    this.onReceive = this.onReceive.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  onReceive(data) {
    // Made the card items and Pagination logic to spread data in pages
    console.log("JSON objec is: " + JSON.stringify(data));
    if (data != null) {
      const places = data.business;
      const items = places.map((item, index) => {
        return (
          <CardItem
            ob={{
              title: item.name,
              address:
                item.location.address1 +
                ", " +
                item.location.city +
                ", " +
                item.location.state +
                ", " +
                item.location.country,
              cellPhone: item.phone,
              img: item.photos[0], // each business has 1 or many pics so i'm just picking the first one
              rating: item.rating,
              reviewCount: item.review_count
            }}
            key={index}
          />
        );
      });

      if (places.length <= 10) {
        this.setState({
          items: items,
          pagginationVisible: false,
          pageCount: Math.ceil(places.length / 10)
        });
      }

      if (places.length >= 10) {
        this.setState({
          moreItems: items,
          pagginationVisible: true,
          pageCount: Math.ceil(places.length / 10)
        });
        this.handlePageClick({ selected: 0 }); // Will show only first 10 elements
      }
    } else {
      this.setState({
        items: null,
        moreItems: null,
        pagginationVisible: false,
        pageCount: 0
      });
    }
  }

  handlePageClick(data) {
    // Pagination logic for click
    var index = data.selected;
    var limit = index + 1 + "0"; // converted 0 to 1 and make it 10
    console.log("Limit is : " + limit);

    index === 0 ? (index = 0) : (index = index + 10); // start from next time 10 index

    const items = [];
    var count = 10;
    for (
      var a = index, b = 1;
      b < this.state.moreItems.length || b === count;
      a++, b++
    ) {
      items.push(this.state.moreItems[a]);
      console.log("Index is:" + b);

      if (b === 10) {
        this.setState({ items: items });
        return;
      }
    }
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    count++;
    return (
      <div
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          display: "flex",
          flexDirection: "column",
          minHeight: 400,
          height: "auto"
        }}
      >
        <SearchPlaces onReceive={this.onReceive} isSearch={true} />

        {this.state.pagginationVisible === true ? (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              minWidth: 500
            }}
          >
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 12
          }}
        >
          {this.state.items != null ? (
            this.state.items
          ) : count === 1 ? null : (
            <NoSearchAvailable />
          )}
        </div>
      </div>
    );
  }
}

SearchComponent.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(withRouter(SearchComponent));
