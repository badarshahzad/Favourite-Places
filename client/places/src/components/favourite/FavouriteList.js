import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import AddFavDialog from "./AddFavDialog";

import {
  addToFavourite,
  deleteFromFavourite,
  getAllFavourite
} from "../../actions/favouritAction";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 765,
    height: 465
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
});

class FavouriteList extends React.Component {
  constructor() {
    super();
    this.state = {
      dense: false,
      secondary: false,
      open: false
    };
  }

  componentDidMount() {
    // Fetching the data from the backend
    this.props.getAllFavourite();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onItemClick() {
    console.log("Item is click");
  }

  render() {
    const { classes, favourite } = this.props;
    console.log(
      "Favourite object is 1: " + this.props.favourite.favouriteObject
    );
    console.log(
      "Favourite object is 2: " +
        JSON.stringify(this.props.favourite.favouriteObject)
    );

    return (
      <div className={classes.root}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Typography
            variant="h6"
            style={{ marginLeft: 16, margin: 8, marginTop: 2 }}
          >
            Favourite Palces
          </Typography>

          <AddFavDialog />
        </div>

        <GridList cellHeight={180} className={classes.gridList}>
          {favourite.allFavourite != null &&
          favourite.allFavourite.length != 0 ? (
            favourite.allFavourite.map((tile, index) => (
              <GridListTile key={index}>
                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  subtitle={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      <span style={{ margin: 2 }}>{tile.address}</span>
                      <span style={{ margin: 2 }}>{tile.cellPhone}</span>
                    </div>
                  }
                  actionIcon={
                    <div
                      onClick={() => {
                        console.log("Yes delete it!" + tile._id);
                        // Delete the specific element
                        this.props.deleteFromFavourite(tile._id);
                        this.props.getAllFavourite();
                      }}
                    >
                      <IconButton className={classes.icon}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  }
                />
              </GridListTile>
            ))
          ) : (
            <div
              className="container"
              style={{
                display: "flex",
                marginTop: 32,
                justifyContent: "center"
              }}
            >
              <h6>No item in your favourite bucket</h6>
            </div>
          )}
        </GridList>
      </div>
    );
  }
}

FavouriteList.propTypes = {
  classes: PropTypes.object.isRequired,
  addToFavourite: PropTypes.func.isRequired,
  deleteFromFavourite: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  favourite: state.favourite
});

export default connect(
  mapStateToProps,
  { addToFavourite, deleteFromFavourite, getAllFavourite }
)(withStyles(styles)(FavouriteList));
