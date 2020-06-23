const router = require('express').Router();

module.exports = (connection, redirectLogin, qGetAllUsers) => {
    router.get('/', redirectLogin, (req, res) => {
        const {usernameInSession} = req.session;
        connection.query(qGetAllUsers, (err, rows) => {
            if (err) {
                console.log(err);
                res.render('some_error', {sess_username : usernameInSession});
            }
            else {
                res.render('alltweakers', {users : rows, sess_username : usernameInSession});
            }
        });
    });
    return router;
};