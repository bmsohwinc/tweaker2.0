const router = require('express').Router();

module.exports = (redirectLogin, SESS_NAME) => {
    router.post('/', redirectLogin, (req, res) => {
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
    });
    return router;
};