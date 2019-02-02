const express = require("express");
const router = express.Router();
const gravater = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/Users");

/**
 *  @route  POST api/users/regiester
 *  @desc   Register
 *  @access Public
 */
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  // isValid: it will be true when the data is avilable
  if (!isValid) {
    res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exist";
      return res.status(400).json(errors);
    } else {
      const avatar = gravater.url(req.body.email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm" // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) res.json(err);
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              //created a profile
              const newProfile = new Profile({
                user: user._id
              });

              newProfile
                .save()
                .then(() => {
                  console.log("Profiel created");
                })
                .catch(err => res.json(404).json(err));

              res.json(user);
            })

            .catch(err => console.log(err));
        });
      });
    }
  });
});

/**
 *  @route  POST api/users/regiester
 *  @desc   Login User / Returning JWT token
 *  @access Public
 */
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  console.log("isValid response value is: " + isValid);
  // Check Validation
  // isValid: it will be true when the data is avilable
  if (!isValid) {
    res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user if match
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT payload

        // Sign Token
        jwt.sign(payload, keys.secretKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "bearer " + token // bearer in v4 {https://stackoverflow.com/questions/45897044/passport-jwt-401-unauthorized}
          });
        });
      } else {
        errors.password = "Sorry, password is incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

/**
 *  @route  GET api/users/current
 *  @desc   Return the curren tuser
 *  @access Private
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
module.exports = router;
