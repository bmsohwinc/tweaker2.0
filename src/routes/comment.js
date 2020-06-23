const e = require('express');

const router = require('express').Router();

module.exports = (connection, redirectLogin, qAllCommentsCount, qAddNewComment, qLikeAComment) => {
    router.post('/:tweet_id', redirectLogin, (req, res) => {
        const {usernameInSession} = req.session;
        const tweet_id = req.params.tweet_id;
        const {userIdInSession} = req.session;
        const {newcomment} = req.body;
        const date_of_comment = new Date().toISOString().slice(0, -14);
        const number_of_likes = 0;
        if (newcomment.length != 0) {
            connection.query(qAllCommentsCount, (err, rows) => {
                if (err) {
                    console.log(err);
                    res.render('some_error', {sess_username : usernameInSession});
                }
                else {
                    const comment_id = rows[0].count + 1;
                    connection.query(qAddNewComment, [comment_id, userIdInSession, tweet_id, date_of_comment, number_of_likes, newcomment], (err, rows1) => {
                        console.log('New comment added successfully');
                        res.redirect('/full_tweet/' + tweet_id);
                    });                
                }
            });
        }
        else {
            res.redirect('/full_tweet/' + tweet_id);
        }
    });

    router.post('/like/:comment_id', redirectLogin, (req, res) => {
        const {usernameInSession} = req.session;
        const comment_id = req.params.comment_id;
        const {tweet_id} = req.body;
        connection.query(qLikeAComment, [comment_id], (err, rows) => {
            if (err) {
                console.log(err);
                res.render('some_error', {sess_username : usernameInSession});
            }
            else {
                console.log(`Like successful for comment_id ${comment_id}`);
                res.redirect('/full_tweet/' + tweet_id);
            }
        });
    });

    return router;
};