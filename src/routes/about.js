const router = require('express').Router();

module.exports = (redirectLogin) => {
    router.get('/', redirectLogin, (req, res) => {
        const {usernameInSession} = req.session;
        res.render('about', {sess_username : usernameInSession});
    });
    return router;
};