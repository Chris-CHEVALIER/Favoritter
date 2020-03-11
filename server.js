var Twitter = require('twitter');
require('dotenv').config() 

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const wordToSearch = '#gaming';
const millisecondsBetweenCalls = 60000

setInterval(function() {
    client.get('search/tweets', {q: wordToSearch}, function(error, tweets, response) {
        tweets.statuses.map((tweet) => {
            if(!tweet.errors) {
                client.post('favorites/create', {id: tweet.id_str}, function(error, tweet, response) {
                    if (!error) {
                        console.log(tweet.text);
                    } else {
                        console.log(tweet);
                    }
                })
            }
        })
    });
}, millisecondsBetweenCalls);