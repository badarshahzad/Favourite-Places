import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationIcon from "@material-ui/icons/LocationOn";
import CellPhoneIcon from "@material-ui/icons/Phone";
import { connect } from "react-redux";
import { addToFavourite, deleteFromFavourite } from "../actions/favouritAction";
import ReactStars from "react-stars";

const styles = theme => ({
  card: {
    minWidth: 150,
    maxWidth: 300,
    maxHeight: 350,
    display: "flex",
    flexWrap: "wrap",
    margin: 8,
    paddingBottom: 8
  },

  actions: {
    display: "flex"
  }
});

class RecipeReviewCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavourite: false,
      successInDelete: {},
      favouriteObject: {}
    };

    this.handleFavourite = this.handleFavourite.bind(this);
  }

  handleFavourite(favourite) {
    this.setState({ isFavourite: !this.state.isFavourite });

    if (!this.state.isFavourite) {
      console.log("You made the favourite: " + JSON.stringify(favourite));

      favourite.id =
        "_" +
        Math.random()
          .toString(36)
          .substr(2, 9);

      console.log("Add this id: " + favourite.id);
      this.props.addToFavourite(favourite);
    } else {
      console.log("Remove this id: " + favourite.id);
      this.props.deleteFromFavourite(favourite.id);
    }
  }

  render() {
    const { classes, ob } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: 265,
                height: 50
              }}
            >
              <Typography variant="headline" style={{ fontSize: 18 }}>
                {ob.title}
              </Typography>

              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "flex-end"
                }}
                onClick={() => this.handleFavourite(ob)}
              >
                <FavoriteIcon
                  style={this.state.isFavourite ? { color: "red" } : null}
                />
              </div>
            </div>
          }
          subheader={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 56
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <LocationIcon style={{ color: "#c30000" }} />
                <Typography
                  variant="display1"
                  style={{ padding: 8, fontSize: 14 }}
                >
                  {ob.address}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <CellPhoneIcon />

                {ob.cellphone ? (
                  <Typography
                    variant="display1"
                    style={{ padding: 8, fontSize: 14 }}
                  >
                    {ob.cellphone}
                  </Typography>
                ) : (
                  <Typography
                    variant="display1"
                    style={{ padding: 8, fontSize: 14 }}
                  >
                    {"Not Available"}
                  </Typography>
                )}
              </div>
            </div>
          }
        />
        <div className="container">
          <img
            src={ob.img}
            style={{
              resize: "contain",
              width: 268,
              height: 150,
              borderRadius: 4,
              marginBottom: 4
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <ReactStars value={ob.rating} size={24} edit={false} />
            <Typography
              variant="subheading"
              style={{ marginLeft: 16, marginTop: 7 }}
            >
              {ob.reviewCount}
            </Typography>
          </div>
        </div>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
  addToFavourite: PropTypes.func.isRequired,
  deleteFromFavourite: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  favouriteObject: state.favouriteObject
});

export default connect(
  mapStateToProps,
  { addToFavourite, deleteFromFavourite }
)(withStyles(styles)(RecipeReviewCard));
