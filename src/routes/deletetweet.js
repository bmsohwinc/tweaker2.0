const router = require('express').Router();

module.exports = (connection, redirectLogin, qDeleteTweet) => {
    router.get('/:tweet_id', redirectLogin, (req, res) => {
        const {userIdInSession} = req.session;
        const tweet_id = req.params.tweet_id;
        connection.query(qDeleteTweet, [tweet_id], (err, rows) => {
            if (err) {
                console.log(err);
                res.render('some_error');
            }
            else {
                console.log('Delete successful for tweet_id: ', tweet_id);
                res.redirect('/profile/' + userIdInSession);
            }
        });
    });
    return router;
};