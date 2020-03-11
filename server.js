var Twitter = require('twitter');
require('dotenv').config() 

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

//const wordToSearch = '#gaming';
const millisecondsBetweenCalls = 300000;

function favoriteTweetsByWord(wordToSearch) {
    setInterval(function() {
        client.get('search/tweets', {q: wordToSearch}, function(error, tweets, response) {
            tweet = tweets.statuses[0];
            if (!error && response.caseless.dict.status == '200 OK') {
                client.post('favorites/create', {id: tweet.id_str}, function(error, tweet, response) {
                    if (!error && response.caseless.dict.status == '200 OK') {
                        console.log(tweet.text);
                    } else {
                        console.log(tweet);
                    }
                })
            }
        });
    }, millisecondsBetweenCalls);
}

wordsToSearch = ['#gaming', '#gamer', "#videogame"]

wordsToSearch.map((wordToSearch) => {
    favoriteTweetsByWord(wordToSearch)
})

