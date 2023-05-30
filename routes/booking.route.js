const express = require("express");
const { BookingModel } = require("../models/booking.model");
const { FlightModel } = require("../models/flight.model");
const { UserModel } = require("../models/user.model");


const bookingRouter = express.Router();


bookingRouter.post("/booking", async (req, res) => {
  try {
    let payload = req.body
    let bookingUser = await new BookingModel({username: payload.userID, flight: payload.flightID});
        bookingUser.save();
        res.send({message:"Flight has been booked"});
  } 
    catch (err) {
        res.send({message:"Something went wrong", error:err.message});
  }
});

bookingRouter.get("/dashboard", async (req, res) => {
  try {
    let allData = [];
    let bookingData = await BookingModel.find()
    for (let value = 0; value < bookingData.length; value++) {
      let userData = await UserModel.find({ _id: bookingData[value].username })
      let flightInfo = await FlightModel.find({ _id: bookingData[value].airline })
      let data = {name: userData[0].name, email: userData[0].email, details: flightInfo}
      allData.push(data)
    }
    res.send(allData);
  } catch (err) {
    res.send({message:"Something went wrong", error:err.message});
  }
});

module.exports = { bookingRouter };