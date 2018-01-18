//This requires the dotenv module to hide away the API keys in a seperate file
require("dotenv").config();

//This requires the keys.js file to access the various APIs
const keys = require("keys.js");

//This requires the request module so that we can use it to access the OMDB API
const request = require("request");

//This allows us to access our Spotify API ID and Secret
const spotify = new Spotify(keys.spotify);

//This allows us to access our ID, key, and token info for the Twitter API
const client = new Twitter(keys.twitter);

// Stores the inputs for the various arguments into an array
const input = process.argv;

//This is where we deal with our OMDB request
//The format will be `node liri.js movie-this '<movie name here>'`
const movieName = "";

//Here we loop through the input
for (let i = 2; i < input.length; i++) {
    if (i > 2 && i < input.length) {
        movieName = "movie-this" + "+" input[i];
    }

    else {
        movieName += input[i];
    }
}

//Here is our request to OMDB for a specified movie
const queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

