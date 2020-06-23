const router = require('express').Router();

module.exports = (connection, redirectLogin, qGetTweetAndUser, qEditTweet) => {
    
    router.get('/:tweet_id', redirectLogin, (req, res) => {
        const {userIdInSession} = req.session;
        const tweet_id = req.params.tweet_id;
        connection.query(qGetTweetAndUser, [tweet_id], (err, rows) => {
            if (err) {
                console.log(err);
                res.render('some_error');
            }
            else {
                res.render('edittweet', {tweet : rows[0]});           
            }
        });
    });

    router.post('/:tweet_id', redirectLogin, (req, res) => {
        const {userIdInSession} = req.session;
        const {the_tweet} = req.body;
        const tweet_id = req.params.tweet_id;
        
        if (the_tweet.length != 0) {
            connection.query(qEditTweet, [the_tweet, tweet_id], (err, rows) => {
                if (err) {
                    console.log(err);
                    res.render('some_error');
                }
                else {
                    console.log('Tweet Update successful');
                    res.redirect('/full_tweet/' + tweet_id);
                }
            });
        }      
        else {
            res.redirect('/full_tweet/' + tweet_id);
        }  
    });
    
    return router;
};