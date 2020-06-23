const router = require('express').Router();

module.exports = (connection, redirectLogin, qGetTweetAndUser, qGetCommentsAndUsers, qLikeATweet, qGetUserProfile) => {
    router.get('/:tweet_id', redirectLogin, (req, res) => {
        const {userIdInSession} = req.session;
        const tweet_id = req.params.tweet_id;

        connection.query(qGetUserProfile, [userIdInSession], (err, rows0) => {
            if (err) {
                console.log(err);
                res.render('some_error');
            }
            else {
                connection.query(qGetTweetAndUser, [tweet_id], (err, rows1) => {
                    if (err) {
                        console.log(err);
                        res.render('some_error');
                    }
                    else {
                        connection.query(qGetCommentsAndUsers, [tweet_id], (err, rows2) => {
                            if (err) {
                                console.log(err);
                                res.render('some_error');
                            }
                            else {
                                let rights = false;
                                if (rows1[0].user_id == userIdInSession) {
                                    rights = true;
                                }
                                console.log('rows0[0] = ', rows0[0]);
                                res.render('fulltweet', {username : rows0[0].user_name, rights : rights, tweet : rows1[0], comments : rows2});
                            }
                        });
                    }
                });
            }
        });        
    });

    router.post('/:tweet_id', redirectLogin, (req, res) => {
        const tweet_id = req.params.tweet_id;
        connection.query(qLikeATweet, [tweet_id], (err, rows) => {
            if (err) {
                console.log(err);
                res.render('some_error');
            }
            else {
                console.log(`Like successful for tweet_id ${tweet_id}`);
                res.redirect('/full_tweet/' + tweet_id);
            }
        });
    });

    return router;
};