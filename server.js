/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Karmkumar Jigneshbhai Patel______________________ Student ID: 124767211______________ Date: 16-09-2022________________
*  Cyclic Link: https://blushing-cyan-wrap.cyclic.app/
*
********************************************************************************/ 


const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv').config(); 
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

var HTTP_PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/",function(req,res){
   res.json({message: "API Listening"}); 
});

app.post("/api/movies",function(req,res){
    db.addNewMovie(req.body).then((newMovie)=>{
        res.json(newMovie);
    })
    .catch(function(err) {
        res.status(500).send("Error in adding new movie");
    });
});

app.get("/api/movies",function(req,res){
    db.getAllMovies(req.query.page,req.query.perPage,req.query.title).then((filteredMovies)=>{
        res.json(filteredMovies);
    }).catch(function(err){
        res.render({message:"No movies to be displayed"});
    });
});

app.get("/api/movies/:id", function(req,res){
    db.getMovieById(req.params.id).then((movie)=>{
        res.json(movie);
    }).catch(function(err){
        res.render({message:"No movies to be displayed"});
    });
});

app.put("/api/movies",function(req,res){
    db.updateMovieById(req.body).then((updatedMovie)=>{
        res.json(updatedMovie);
    })
    .catch(function(err) {
        res.status(500).send("Error in updataing movie");
    });
});

app.delete("/api/movies/:id", function(req,res){
    db.deleteMovieById(req.params.id).then(()=>{
        res.status(204).send("DElete a movie successfully");
    }).catch(function(err) {
        res.status(500).send("Error in deleting movie");
    });
});

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});


