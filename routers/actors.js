const mongoose = require('mongoose');
const Actor = require('../models/actor');
const Movie = require('../models/movie');
module.exports = {
    // Modified getAll() method which also contains the details of movies inside the movie array
    getAll: function (req, res) {
        Actor.find()
            .populate('movies')
                .exec(function (err, actor) {
                    if (err) return res.json(err);
                    if (!actor) return res.json();
                    res.json(actor);
                });
    },
    // creates an actor 
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },
    // fetches an actor
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    // updates an actor 
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    // deletes an actor from MongoDB
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    // adds a movie to the actors 
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },
    // deletes an actor and 
    deleteActorandMovies: function (req, res) {
        Actor.findOne({_id: req.params.id}, function (err, actor) {
            if (err) return res.status(400).json(err);
            res.json(actor);
            let i = 0;
            while (i <= actor.movies.length) {
                Movie.findByIdAndDelete((actor.movies[i])).exec(function (err, movie) {
                    console.log('deleted movie ' + movie)
                    i++
                })
            }
        })
    },
            
    /*  for (let i = 0; i < actor.movies.length; i++){
                Movie.findByIdAndDelete((actor.movies[i]))
                    .populate('actors')
                        .exec(function (err, movies) {
                            if (err) return res.json(err);
                            if (!movies) return res.json();
                            console.log(movies)
                    
                            Actor.deleteOne({_id:req.params.id},function (err, actor){
                                if (err) return res.status(400).json(err);
                                res.json(actor);
                            })
                        }, 
    */

   
    removeMovie: function (req, res){
        Actor.findOne({_id: req.params.id}, function (err, actor) {
            if (err) return res.status(400).json(err);
            res.json(actor);
            Movie.findOneAndDelete({_id: actor.movies[0]}, function (err, movie){
                if(err) return res.status(400).json(err);
                res.json(movie);
            })
        })
    }
};