const router = require('express').Router();

module.exports = (connection, queryGetNumberOfUsers, queryForRegister, queryGetUserForUsername, redirectHome) => {
    router.get('/', redirectHome, (req, res) => {
        res.render('register', {errmsg: ''});
    });

    router.post('/', redirectHome, (req, res) => {
        const {
            username,
            fullname,
            place,
            phonenumber,
            about,
            password
        } = req.body;

        if (username && fullname && place && phonenumber && about && password) {
            connection.query(queryGetNumberOfUsers, (err, rows1, fields) => {
                if (err) {
                    console.log(err);
                    res.render('some_error');
                }
                else {

                    connection.query(queryGetUserForUsername, [username], (err, rows2, fields) => {
                        if (err) {
                            console.log(err);
                            res.render('some_error');
                        }
                        else {
                            if (rows2[0].user_count !== 0) {
                                res.render('register', {errmsg : 'Username already exists!!'})
                            }
                            else {
                                const user_id = rows1[0].users_count + 1;
                                connection.query(queryForRegister, [
                                    user_id, 
                                    username, 
                                    fullname, 
                                    place, 
                                    phonenumber, 
                                    '',
                                    about, 
                                    password
                                ], (err, rows3, fields) => {
                                    if (err) {
                                        console.log(err);
                                        res.render('some_error');
                                    }
                                    else {
                                        req.session.userIdInSession = user_id;
                                        req.session.usernameInSession = username;
                                        console.log('User successfully registered. Details: ', rows3);
                                        res.redirect('/');
                                    }
                                });
                            }
                        }
                    });                
                }
            });
        }
        else {
            res.render('register', {errmsg : 'Please fill all fields'})
        }
    });

    return router;
};