import axios from "axios";
import { ADD_FAVOURITE, GET_ALL_FAVOURITE, DELETE_FAVOURITE } from "./types";

// Add to favourite
export const addToFavourite = favourite => dispatch => {
  axios
    .post("/api/profile/favourite", favourite)
    .then(res => {
      const ob = res;
      console.log(" Data is : " + JSON.stringify(ob));
      dispatch({ type: ADD_FAVOURITE, payload: ob });
    })
    .catch(err => {
      console.log("Error ocurred while adding to favourite" + err);
    });
};

// Delete from favourite
export const deleteFromFavourite = id => dispatch => {
  console.log("Delete is user Id from action:  " + id);
  axios
    .delete(`/api/profile/favourite/${id}`)
    .then(res => {
      const ob = res.data;
      console.log("Response is to delete: " + JSON.stringify(ob));
      dispatch({ type: GET_ALL_FAVOURITE, payload: ob });
    })
    .catch(err => {
      console.log("Error ocurred while removing to favourite" + err);
    });
};

// Get All from favourite
export const getAllFavourite = () => dispatch => {
  axios
    .get("/api/profile/favourite/all")
    .then(res => {
      const ob = res.data;
      console.log("Response is for all favourite: " + JSON.stringify(ob));
      dispatch({ type: GET_ALL_FAVOURITE, payload: ob });
    })
    .catch(err => {
      console.log("Error ocurred while getting all the favourite" + err);
    });
};
