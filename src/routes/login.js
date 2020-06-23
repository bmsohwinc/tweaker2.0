const router = require('express').Router();

module.exports = (connection, queryForLogin, redirectHome, qCheckDeletedUser) => {
    router.get('/', redirectHome, (req, res) => {
        res.render('login', {errmsg: ""});
    });

    router.post('/', redirectHome, (req, res) => {
        const {username, password} = req.body;
        if (username && password) {

            connection.query(queryForLogin, [username, password], (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    res.render('some_error');
                }
                else {
                    if (!rows[0]) {
                        res.render('login', {errmsg : "Username or Password is incorrect"});
                    } 
                    else if (!rows[0].user_id) {
                        res.render('login', {errmsg : "Username or Password is incorrect"});
                    }
                    else {
                        connection.query(qCheckDeletedUser, [rows[0].user_id], (err, rows0) => {
                            if (err) {
                                console.log(err);
                                res.render('some_error');
                            }
                            else {
                                if (rows0[0]) {
                                    res.render('nosuchprofileforlogin');
                                }
                                else {
                                    console.log('Login successful for username : ', username);
                                    req.session.userIdInSession = rows[0].user_id;
                                    req.session.usernameInSession = username;
                                    res.redirect('/');
                                }
                            }
                        });                        
                    }
                }
            });
        }
        else {
            res.render('login', {errmsg : "Username or Password is blank"});
        }
    });

    return router;
};