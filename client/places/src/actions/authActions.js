import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwtDecode from "jwt-decode";

// We have to do additional work here because we will be fetching data from api as
// asynchrounously from the backend and we have to wait for the response and then
// we have to dispatch event { * This is where Thunk middleware come in }

// For that essence we just simply have to add one more arrow
// REF : {https://medium.com/fullstack-academy/thunks-in-redux-the-basics-85e538a3fe60}

// Register User
export const registerUser = (newUser, history) => dispatch => {
  console.log("yes came here");
  axios
    .post("/api/users/register", newUser)
    .then(res => {
      console.log("Yes here reach successfully");
      history.push("/login");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to local storage
      localStorage.setItem("jwtToken", token);
      // Set time after that the user logout
      const time = Date.now / 1000 + 3600;
      localStorage.setItem("expired", time);
      // Set token to Auth header to access the protected routes
      setAuthToken(token);
      // Token includes the information I have to decode it
      const decoded = jwtDecode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set Logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Logged user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user ot to {} which will set isAuthenticated false
  dispatch(setCurrentUser({}));
};
