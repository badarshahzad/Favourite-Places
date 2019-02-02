const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    default: Date.now
  },
  favourite: [
    {
      title: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      cellPhone: {
        type: String
      },
      img: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
