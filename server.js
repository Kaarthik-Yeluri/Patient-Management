//https://hub.packtpub.com/building-movie-api-express/
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actors');
const movies = require('./routers/movies');
const app = express();
const path = require('path');
app.listen(8089);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "dist/W9LAB")));
mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});

//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.put('/actors/:id', actors.updateOne);
app.delete('/actors/:id', actors.deleteOne);
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.put('/movAct', movies.addActor)
app.post('/movies', movies.createOne);
app.delete('/movies/:title', movies.deleteMovieByTitle);
app.delete('/movies/:year1/year2', movies.deleteMoviesbyYear);
