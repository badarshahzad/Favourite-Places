import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SearchPlaces from "../search/SearchPlaces";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import classNames from "classnames";
import { connect } from "react-redux";

import {
  addToFavourite,
  deleteFromFavourite
} from "../../actions/favouritAction";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    flexBasis: 200
  },
  textField: {
    flexBasis: 200
  },
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
});

const ranges = [
  {
    value: "Restaurant",
    label: "Restaurant"
  },
  {
    value: "Theater",
    label: "Theater"
  },
  {
    value: "Museum",
    label: "Museum"
  }
];

class AddFavDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      cellPhone: "",
      type: "",
      address: "",
      title: ""
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onSave = () => {
    this.setState({
      open: false,
      cellPhone: "",
      type: "",
      address: "",
      title: ""
    });

    const dataObject = {};
    dataObject.id =
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9);
    dataObject.img = "";
    dataObject.cellPhone = this.state.cellPhone;
    dataObject.address = this.state.address;
    dataObject.type = this.state.type;
    dataObject.title = this.state.title;

    console.log("Save this object in list: " + JSON.stringify(dataObject));
    this.props.addToFavourite(dataObject);
  };

  onReceive = data => {
    console.log("Data from the Add to favourite: " + data);
    this.setState({ address: data });
  };

  handleChange(e) {
    // 06-01-2019
    // REF https://stackoverflow.com/questions/43134195/how-to-allow-only-numbers-in-textbox-and-format-as-us-mobile-number-format-in-re

    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    if (onlyNums.length < 12) {
      this.setState({ cellPhone: onlyNums });
    } else if (onlyNums.length === 10) {
      const number = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      this.setState({
        cellPhone: number
      });
    }
  }

  handleChangeType(e) {
    this.setState({ type: e.target.value });
  }
  handleChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Fab
          color="primary"
          aria-label="Add"
          size="small"
          className={classes.fab}
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Fab>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Add
              </Typography>
              <Button color="inherit" onClick={this.onSave}>
                Save
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <TextField
                id="outlined-name"
                label="Title"
                className={classes.textField}
                value={this.state.title}
                onChange={this.handleChangeTitle.bind(this)}
                margin="normal"
                variant="outlined"
              />
            </ListItem>
            <ListItem
              button
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start"
              }}
            >
              <ListItemText primary={"Address"} />
              <SearchPlaces onReceive={this.onReceive} isSearch={false} />
            </ListItem>
            <ListItem button>
              <TextField
                id="outlined-name"
                label="Phone"
                className={classes.textField}
                value={this.state.cellPhone}
                onChange={this.handleChange.bind(this)}
                margin="normal"
                variant="outlined"
              />
            </ListItem>
            <ListItem button>
              <TextField
                select
                label="Type"
                className={classNames(classes.margin, classes.textField)}
                value={this.state.type}
                onChange={this.handleChangeType.bind(this)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">{""}</InputAdornment>
                  )
                }}
              >
                {ranges.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

AddFavDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  addToFavourite: PropTypes.func
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { addToFavourite }
)(withStyles(styles)(AddFavDialog));
