const express = require("express")
const {FlightModel} = require("../models/flight.model")

const flightRouter = express.Router()

flightRouter.get("/flights", async(req,res)=>{
    try{
        let flight = await FlightModel.find()
        res.send(flight)
    }
    catch(err){
        res.send({message:"Something went wrong", error:err.message})
    }
})

flightRouter.get("/flights/:id", async(req,res)=>{
    let id = req.params.id
    if(id){
        try{
            const flight = await FlightModel.find({_id:id})
            res.send(flight)
        }
        catch(err){
            res.send({message:"Something went wrong", error:err.message})
        }
    }
})

flightRouter.post("/flights", async(req,res)=>{
    try{
        let flight = new FlightModel(req.body)
        await flight.save()
        res.send({message:"Flight has been added"})
    }
    catch(err){
        res.send({message:"Something went wrong", error:err.message})
    }
})

flightRouter.patch("/flights/:id", async(req,res)=>{
    let id = req.params.id
    const payload = req.body
    try{
        await FlightModel.findByIdAndUpdate({_id:id},payload)
        res.send(`The flight with ID: ${id} has been updated`)
    }
    catch(err){
        res.send({message:"Something went wrong", error:err.message})
    }
})

flightRouter.delete("/flights/:id", async(req,res)=>{
    let id = req.params.id
    try{
        await FlightModel.findByIdAndDelete({_id:id})
        res.send(`The flight with ID: ${id} has been deleted`)
    }
    catch(err){
        res.send({message:"Something went wrong", error:err.message})
    }
})

module.exports = {flightRouter}