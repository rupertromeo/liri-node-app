//      ***This section establishes all of our variables needed for npm modules***
//This requires the dotenv module to hide away the API keys in a seperate file
require("dotenv").config();

//This requires the keys.js file to access the various keys to the APIs
const keys = require("./keys.js");

//This requires the Twitter module to access the API
const twitter = require("twitter");

//This requires the Spotify module to access the API
const spotify = require("node-spotify-api");

//This requires the request module so that we can use it to access the OMDB API
const request = require("request");

//This requires the FileSystem module to access the random.txt file
const fs = require("fs");

//      ***This section lists our keys needed to access Twitter and Spotify***
//This allows us to access our Spotify API ID and Secret
const spotifyAccess = new spotify(keys.spotify);

//This allows us to access our ID, key, and token info for the Twitter API
//const client = new twitter(keys.twitter);

const argInput = process.argv;

// Here we record information to our log.txt file
const recordToLog = function(info) {
    fs.appendFile("log.txt", JSON.stringify(info) +"\n", function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("Your Log has been updated.");
    });
};


//----------***This is where we deal with our OMDB request***----------
//The format for the input will be `node liri.js movie-this '<movie name here>'`
//Here we create a function to run the movie search and provide a value for when the input is undefined
const movie = function (movieName) {
    
    if (movieName === undefined) {
        movieName = "Tommy Boy";
    }

//Here is our request to OMDB for a specified movie and the clean up of the returned information
const queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

request(queryURL, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        let cleanUp = JSON.parse(body)

        const info = {
        "Movie Title:":  cleanUp.Title,
        "Release Year:":  cleanUp.Year,
        "IMDB Rating:":  cleanUp.imdbRating,
        "Rotton Tomatoes Rating:":  cleanUp.Ratings[1].Value,
        "Country:":  cleanUp.Country,
        "Language:":  cleanUp.Language,
        "Plot:":  cleanUp.Plot,
        "Actors:":  cleanUp.Actors,
        };
        
        console.log(info);
        recordToLog(info);
        }
    });
};

//       ***This is our section of code which deals with obtaining our tweets through the TWitter API***
const tweets = function() {

    //This allows us to access our ID, key, and token info for the Twitter API
    let client = new twitter(keys.twitter);

    let params = {screen_name: "RupertRomeo"};

    client.get("statuses/user_timeline", params, function(error, tweets, response) {

        if (!error) {
            const info = [];

            for (let i = 0; i < tweets.length; i++) {
                info.push({
                Created_at: tweets[i].created_at,
                text: tweets[i].text
            });
            }
            console.log(info);
            recordToLog(info);
        }
    });
};

//      ***This is the section of code which deals with searching songs using the Spotify API***
const captureArtist = function(artist) {
    return artist.name;
}

const spotifySearch = function(songTitle) {
    if (songTitle === undefined) {
        songTitle = "Return of the Mack";
    }
    
    spotifyAccess.search({ type: 'track', query: songTitle}, function(err, data) {
        
        if (err) {
            console.log("Looks like this is messed up: " + err);
            return;
        }

        let song = data.tracks.items;
        const info = [];
        
        for (let i = 0; i < song.length; i++) {
            info.push({
            "Artist": song[i].artists.map(captureArtist),
            "Song": song[i].name,
            "Album":  song[i].album.name,
            "URL": song[i].preview_url
            });
        }

        console.log(info);
        recordToLog(info);
    });
};

//doWhatItSays function section
const doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);
        let inFile = data.split(",");

        if (inFile.length === 2) {
            commands(inFile[0], inFile[1]);
        }

        else if (inFile.length === 1) {
            commands(inFile[0]);
        }
    });
};

//      ***This is the section of code that lists our commands that we would like to run***
//These are our conditional statements to pull up tweets, search a song on Spotify, and search a movie on OMDB
const commands = function (input, functionInput) {

    switch (input) {
        case "my-tweets":
            tweets();
            break;

        case "spotify-this-song":
            spotifySearch(functionInput);
            break;
        
        case "movie-this":
            movie(functionInput);
            break;

        case "do-what-it-says":
            doWhatItSays();
        break;

        default:
            console.log("You're doing it all wrong! Try again.")
        
    }
};

const run = function (inputOne, inputTwo) {
    commands(inputOne, inputTwo);
};

run(argInput[2], argInput[3]);