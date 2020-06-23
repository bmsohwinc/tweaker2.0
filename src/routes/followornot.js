const router = require('express').Router();

module.exports = (connection, redirectLogin, qAddFollower, qDeleteFollower) => {
    router.post('/', redirectLogin, (req, res) => {
        const {req_user_id, option} = req.body;
        const {userIdInSession} = req.session;
        if (option == 'follow') {
            connection.query(qAddFollower, [userIdInSession, req_user_id], (err, rows) => {
                if (err) {
                    console.log(err);
                    res.render('some_error');
                }
                else {
                    console.log(`${userIdInSession} has started following ${req_user_id}`);
                    res.redirect('/profile/' + req_user_id);
                }
            });
        }
        else {
            connection.query(qDeleteFollower, [userIdInSession, req_user_id], (err, rows) => {
                if (err) {
                    console.log(err);
                    res.render('some_error');
                }
                else {
                    console.log(`${userIdInSession} has stopped following ${req_user_id}`);
                    res.redirect('/profile/' + req_user_id);
                }
            });
        }
    });

    return router;
};