const router = require('express').Router();

module.exports = (connection, qGetFollowingsTweets, qGetUserDetails, qGetSuggestions, qGetTweetsAndUserForUserId) => {
    router.get('/', (req, res) => {
        const {userIdInSession} = req.session;
        if (userIdInSession) {
            connection.query(qGetFollowingsTweets, [userIdInSession], (err, rows1) => {
                if (err) {
                    console.log(err);
                    res.render('some_error');
                }
                else {
                    connection.query(qGetUserDetails, [userIdInSession], (err, rows2) => {
                        if (err) {
                            console.log(err);
                            res.render('some_error');
                        }
                        else {
                            connection.query(qGetSuggestions, [userIdInSession, userIdInSession], (err, rows3) => {
                                if (err) {
                                    console.log(err);
                                    res.render('some_error');
                                }
                                else {
                                    connection.query(qGetTweetsAndUserForUserId, [userIdInSession], (err, rows4) => {
                                        if (err) {
                                            console.log(err);
                                            res.render('some_error');
                                        }
                                        else {
                                            let all_tweets = rows1;
                                            // console.log('rows4 = ', rows4)
                                            // console.log('--------------');
                                            all_tweets = all_tweets.concat(rows4);
                                            // console.log('--------------');
                                            all_tweets.sort((a, b) => {
                                                if (a.date_of_tweet < b.date_of_tweet) {
                                                    return 1;
                                                }
                                                if (a.date_of_tweet > b.date_of_tweet) {
                                                    return -1;
                                                }
                                                return 0;
                                            });

                                            // console.log(all_tweets);

                                            res.render('home', {user: rows2[0], followings_tweets : all_tweets, suggested : rows3});
                                        }                        
                                    });
                                }                        
                            });
                        }                        
                    });                    
                }
            });            
        }
        else {
            res.render('root');
        }
    });
    return router;
};