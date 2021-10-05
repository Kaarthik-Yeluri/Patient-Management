var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    // fetches the list of movies from MongoDB
    getAll: function (req, res) {
        Movie.find()
        .populate('actors')
            .exec(function (err, movies) {
                if (err) return res.json(err);
                if (!movies) return res.json();
                res.json(movies);
            });
    },
    // creates a movie
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        let movie = new Movie(newMovieDetails);
        movie.save(function (err, movie){
            console.log("movie")
            res.json(movie);
        
        })
        
    },
    // deletes a movie by its title
    deleteMovieByTitle: function (req, res) {
        Movie.findOneAndRemove({title:req.body.title}, function (err, movie){
            if (err) return res.status(400).json(err);
            res.json();
        })
    },
    // adds an actor to the list of actors in a movie
    addActor: function (req, res) {
        Movie.findOne({ title: req.body.title }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ name: req.body.fullName }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id)
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
    
    // deletes all the movies between the years specified
    deleteMoviesbyYear: function (req, res) {
        let year1 = req.body.year1;
        let year2 = req.body.year2;
        Movie.deleteMany().where('year').gt(year2).lt(year1).exec(function (err, movie) {
            console.log("getAllMovies: "+movie);
        })
    }
};