const router = require('express').Router();

module.exports = (connection, redirectLogin, qGetUserDetails, qNewTweet, qAllTweetsCount) => {
    router.get('/', redirectLogin, (req, res) => {
        const {userIdInSession} = req.session;
        connection.query(qGetUserDetails, [userIdInSession], (err, rows) => {
            if (err) {
                console.log(err);
                res.render('some_error');
            }
            else {
                res.render('newtweet', {username : rows[0].user_name, user_id : rows[0].user_id});
            }
        });        
    });

    router.post('/', redirectLogin, (req, res) => {
        const {userIdInSession} = req.session;
        const {the_tweet} = req.body;
        const date_of_tweet = new Date().toISOString().slice(0, -14);
        const number_of_likes = 0;
        if (the_tweet.length != 0) {
            connection.query(qAllTweetsCount, (err, rows) => {
                if (err) {
                    console.log(err);
                    res.render('some_error');
                }
                else {
                    const tweet_id = rows[0].count + 1;
                    connection.query(qNewTweet, [tweet_id, the_tweet, userIdInSession, date_of_tweet, number_of_likes], (err, rows1) => {
                        if (err) {
                            console.log(err);
                            res.render('some_error');
                        }
                        else {                            
                            console.log(`Tweet has been written successfully for user_id ${userIdInSession} and tweet_id : ${tweet_id}`);
                            res.redirect('/profile/' + userIdInSession);
                        }                        
                    });                
                }
            });
        }
        else {
            res.redirect('/new_tweet');
        }
    });

    return router;
};