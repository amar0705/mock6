const express = require("express")
const {connection} = require("./configs/db")
const {userRouter} = require("./routes/user.route")
const {authenticate} = require("./middlewares/authenticate.middleware")
const {flightRouter} = require("./routes/flight.route")
const {bookingRouter} = require("./routes/booking.route")

require("dotenv").config()

const app = express()
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Homepage")
})

app.use("/api", userRouter)
app.use(authenticate)
app.use("/api",flightRouter)
app.use("/api",bookingRouter)

app.listen(process.env.port, async(req,res)=>{
    try{
        await connection
        console.log("Connected to the DB")
    }
    catch(err){
        console.log("Something went wrong")
    }
    console.log(`Listening to port ${process.env.port}`)
})