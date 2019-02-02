const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");

/**
 *  @route  GET api/profile
 *  @desc   GET current users profile
 *  @access Private
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profiel for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

/**
 *  @route  Post api/profile
 *  @desc   Save the favourite object
 *  @access Private
 */
router.post(
  "/favourite",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newFavourite = {
          title: req.body.title,
          address: req.body.address,
          cellPhone: req.body.cellPhone,
          img: req.body.img,
          id: req.body.id
        };

        // Add to favourite array
        profile.favourite.unshift(newFavourite);

        profile
          .save()
          .then(profile => {
            res.json(newFavourite);
          })

          .catch(err => {
            res.status(404).json(err);
          });
      })
      .catch(err => res.status(404).json(err));
  }
);

/**
 *  @route  GET api/favourite/id
 *  @desc   Get All the favourite objects
 *  @access Private
 */
router.get(
  "/favourite/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        res.json(profile.favourite);
      })
      .catch(err => res.status(404).json(err));
  }
);

/**
 *  @route  DELETE api/favourite/id
 *  @desc   DELETE the favourite object
 *  @access Private
 */
router.delete(
  "/favourite/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get the remove index
        const removeIndex = profile.favourite
          .map(item => item.id)
          .indexOf(req.params.id);

        // Split out of array
        profile.favourite.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile.favourite));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
