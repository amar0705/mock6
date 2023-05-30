const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  username: String,
  flight: String,
});

const BookingModel = mongoose.model("booking", bookingSchema);

module.exports = { BookingModel };