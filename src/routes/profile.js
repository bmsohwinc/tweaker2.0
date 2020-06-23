const router = require('express').Router();

module.exports = (connection, redirectLogin, qForGetUserProfile, qForGetTweets, qForGetComments, qForGetFollowings, qForGetFollowers, qCheckDeletedUser) => {
    router.get('/:req_user_id', redirectLogin, (req, res) => {
        const req_user_id = req.params.req_user_id;
        const {userIdInSession} = req.session;
        let showEdit = false;
        let showFollow = true;
        if (req_user_id == userIdInSession) {
            showEdit = true;
        }

        connection.query(qCheckDeletedUser, [req_user_id], (err, rows0) => {
            if (err) {
                console.log(err);
                res.render('some_error');
            }
            else {
                if (rows0[0]) {
                    res.render('nosuchprofile');
                }
                else {
                    connection.query(qForGetUserProfile, [req_user_id], (err, rows1) => {
                        if (err) {
                            console.log(err);
                            res.render('some_error');
                        }
                        else {
                            console.log('profile is :', rows1[0]);
                            if (rows1[0]) {
                                connection.query(qForGetTweets, [req_user_id], (err, rows2) => {
                                    if (err) {
                                        console.log(err);
                                        res.render('some_error');
                                    }
                                    else {
                                        connection.query(qForGetComments, [req_user_id], (err, rows3) => {
                                            if (err) {
                                                console.log(err);
                                                res.render('some_error');
                                            }
                                            else {
                                                connection.query(qForGetFollowings, [req_user_id], (err, rows4) => {
                                                    if (err) {
                                                        console.log(err);
                                                        res.render('some_error');
                                                    }
                                                    else {
                                                        connection.query(qForGetFollowers, [req_user_id], (err, rows5) => {
                                                            if (err) {
                                                                console.log(err);
                                                                res.render('some_error');
                                                            }
                                                            else {
                
                                                                for (let r of rows5) {
                                                                    if (r && (r.user_id == userIdInSession)) {
                                                                        showFollow = false;
                                                                        break;
                                                                    }
                                                                }
                                                                
                                                                res.render('profile', {
                                                                    payload: rows1[0],
                                                                    tweets : rows2,
                                                                    comments : rows3,
                                                                    followings : rows4,
                                                                    followers : rows5,
                                                                    showEdit : showEdit,
                                                                    showFollow : showFollow,
                                                                    req_user_id : req_user_id
                                                                });
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
                                res.render('nosuchprofile');
                            }                
                        }
                    });
                }
            }
        });
    });

    return router;
};