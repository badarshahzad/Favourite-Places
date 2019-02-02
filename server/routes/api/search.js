const express = require("express");
const router = express.Router();
const YELP_API_KEY = require("../../config/keys").YELP_API_KEY;
const axios = require("axios");

// Yelp API search by location
const yelp = require("yelp-fusion");

const axiosYelpGraphQL = axios.create({
  baseURL: "https://api.yelp.com/v3/graphql",
  headers: {
    Authorization: `bearer ${YELP_API_KEY}`
  }
});

onFetchFromYelp = (req, res) => {
  const GET_SEARCH_RESULTS = `{
    search( 
    location: "${req.body.search}") {
      total
      business {
        name
        rating
        review_count
        photos
        phone
        location {
          address1
          city
          state
          country
        }
      }
    }
}`;

  axiosYelpGraphQL
    .post("", { query: GET_SEARCH_RESULTS })
    .then(result => {
      res.json(result.data.data);
    })
    .catch(err => console.log("Error is: " + err));
};

/**
 *  @route  POST api/search
 *  @desc   Search the business places
 *  @access Public
 */
router.post("/", (req, res) => {
  const object = req.body;
  onFetchFromYelp(req, res);
  /**
   * Yelp Fusion API
   */

  /*
  const client = yelp.client(YELP_API_KEY);
  client
    .search({
      location: req.body.search
    })
    .then(response => {
      res.json(response.jsonBody);
    })
    .catch(e => {
      res.json(e);
    });
    */
});

module.exports = router;
