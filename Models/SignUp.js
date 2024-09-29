const mongoose = require("mongoose");

const singupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mpin: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Singup", singupSchema);
