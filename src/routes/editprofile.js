const router = require('express').Router();

module.exports = (connection, redirectLogin, qGetUserDetails, qUpdateUserDetails) => {
    
    router.get('/', redirectLogin, (req, res) => {
        const {userIdInSession} = req.session;
        connection.query(qGetUserDetails, [userIdInSession], (err, rows) => {
            if (err) {
                console.log(err);
                res.render('some_error');
            }
            else {
                res.render('editprofile', {user : rows[0]});
            }
        });
    });

    router.post('/', redirectLogin, (req, res) => {
        const {userIdInSession} = req.session;
        const {
            fullname,
            place,
            phonenumber,
            about
        } = req.body;
        connection.query(qUpdateUserDetails, [fullname, place, phonenumber, about, userIdInSession], (err, rows) => {
            if (err) {
                console.log(err);
                res.render('some_error');
            }
            else {
                console.log('Update successful');
                res.redirect('/profile/' + userIdInSession);
            }
        });
    });
    
    return router;
};