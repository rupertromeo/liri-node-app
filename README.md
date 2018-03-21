# Liri-Node-App
LIRI is the command line app that you never knew you needed. It takes in various search parameters and gives you back all the data that you want. It retrieves information from sources such as Twitter, Spotify, and OMDB. It will show you Tweets from the Twitter personality @rupertromeo. It will let you search song titles and return relevant song titles and artist information. Liri will also let you search movie titles and will return the information that you want to know about that particular title. Give Liri a try today!

## How does Liri work?
As a CLI(Command Line Interface) app, Liri functions only in Command Line so there is no need to open up a web browser. Liri is run by entering specific command line arguments followed by the terms that you would like to search. If you do not enter the correct syntax, Liri will let you know by showing an error message.

To get the Liri app running, you must begin each argument with 'node liri'. You will then need to decide whether you want it to find tweets, search songs on Spotify, or find something on OMDB. To retrieve tweets, you would enter 'node liri my-tweets'. To search spotify, you would enter 'node liri spotify-this-song' along with the song title that you would like to search. To search OMDB, you will use 'node liri movie-this' plus the movie title to search movie information.

### Why is this app useful?
To be honest, this application has no real world value other that showcasing my Javascript skills while working in a node environment. As my skills continue to develop, I will add more functionality to this particular project so feel free to visit again in the future to see what I have done.

# How to get it to work
As a CLI app, it is important that you install node as it is required to run it. First you will want to download this Liri-Node-App repository and then run 'npm install' to download the necessary packages. Another key piece required to get the app to function properly is to provide your own Twitter and Spotify API keys. You will need to store them in a .env file within your root directory. To store your keys in the .env file include the following code:
```
# Spotify API keys

SPOTIFY_ID=YOUR-KEY-HERE
SPOTIFY_SECRET=YOUR-KEY-HERE

# Twitter API keys

TWITTER_CONSUMER_KEY=YOUR-KEY-HERE
TWITTER_CONSUMER_SECRET=YOUR-KEY-HERE
TWITTER_ACCESS_TOKEN_KEY=YOUR-KEY-HERE
TWITTER_ACCESS_TOKEN_SECRET=YOUR-KEY-HERE
```

Once you have completed installing packages and creating your .env file, you will run the 'node liri' plus the command that you want it to perform and it should return to you the desiredinformation that you want. It is important to mention that because LIRI is accessing APIs, you must have an internet connection for it to properly function. Without an internet connection, you will not receive the information that you are looking for.
