const router = require('express').Router();

module.exports = (connection, redirectLogin, qDeleteUser, SESS_NAME) => {
    router.get('/', redirectLogin, (req, res) => {
        const {userIdInSession} = req.session;
        const {usernameInSession} = req.session;
        connection.query(qDeleteUser, [userIdInSession], (err, rows) => {
            if (err) {
                console.log(err);
                res.render('some_error');
            }
            else {
                console.log('Delete successful for user_id: ', userIdInSession);
                req.session.destroy(err => {
                    if (err) {
                        console.log(err);
                        res.render('some_error');
                    }
                    else {
                        res.redirect('/');
                    }
                });
        
                res.clearCookie(SESS_NAME);
            }
        });
    });
    return router;
};