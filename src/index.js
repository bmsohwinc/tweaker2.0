/**
 * Package imports
 */
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const allQueries = require('./db');

/**
 * Create the objects
 */
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

/**
 * Sessions
 */
const {
    PORT = 3000,
    SESS_SECRET = '!iamCAT',
    SESS_NAME = 'sid', 
    SESS_LIFETIME = 2 * 1000 * 60 * 60,
    NODE_ENV = 'development'
} = process.env;

const IN_PROD = NODE_ENV === 'production';
app.use(session({
    name : SESS_NAME,
    saveUninitialized : false,
    secret : SESS_SECRET,
    cookie : {
        maxAge : SESS_LIFETIME,
        sameSite : true,
        secure : IN_PROD
    }
}));

/**
 * Database
 */
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'tweaker',
    password: 'wethree',
    database: 'for_lab'
});
connection.connect();

/**
 * Secure Redirects
 */
const redirectLogin = (req, res, next) => {
    if (!req.session.userIdInSession) {
        res.redirect('/login');
    } else {
        next();
    }
};

const redirectHome = (req, res, next) => {
    if (req.session.userIdInSession) {
        res.redirect('/');
    } else {
        next();
    }
};

/**
 * Routes
 */
app.use('/', require('./routes/root')(connection, allQueries.queryGetFollowingsTweets, allQueries.queryGetUserProfile, allQueries.queryGetSuggestions, allQueries.queryGetTweetsAndUserForUserId));
app.use('/login', require('./routes/login')(connection, allQueries.queryForLogin, redirectHome, allQueries.queryCheckDeletedUser));
app.use('/register', require('./routes/register')(connection, allQueries.queryGetNumberOfUsers, allQueries.queryForRegister, allQueries.queryGetUserForUsername, redirectHome));
app.use('/logout', require('./routes/logout')(redirectLogin, SESS_NAME));
app.use('/profile', require('./routes/profile')(connection, redirectLogin, allQueries.queryGetUserProfile, allQueries.queryGetUserTweets, allQueries.queryGetUserComments, allQueries.queryGetFollowings, allQueries.queryGetFollowers, allQueries.queryCheckDeletedUser));
app.use('/edit_profile', require('./routes/editprofile')(connection, redirectLogin, allQueries.queryGetUserProfile, allQueries.queryUpdateUserProfile));
app.use('/delete_profile', require('./routes/deleteprofile')(connection, redirectLogin, allQueries.queryDeleteUser, SESS_NAME));
app.use('/new_tweet', require('./routes/newtweet')(connection, redirectLogin, allQueries.queryGetUserProfile, allQueries.queryNewTweet, allQueries.queryGetNumberOfTweets));
app.use('/all_tweakers', require('./routes/alltweakers')(connection, redirectLogin, allQueries.queryAllUsersWithFollowersCount));
app.use('/followornot', require('./routes/followornot')(connection, redirectLogin, allQueries.queryAddFollower, allQueries.queryDeleteFollower));
app.use('/full_tweet', require('./routes/fulltweet')(connection, redirectLogin, allQueries.queryGetTweetAndUser, allQueries.queryGetCommentsAndUsers, allQueries.queryLikeATweet, allQueries.queryGetUserProfile));
app.use('/comment', require('./routes/comment')(connection, redirectLogin, allQueries.queryGetNumberOfComments, allQueries.queryAddCommentToTweet, allQueries.queryLikeAComment));
app.use('/edit_tweet', require('./routes/edittweet')(connection, redirectLogin, allQueries.queryGetTweetAndUser, allQueries.queryEditATweet));
app.use('/delete_tweet', require('./routes/deletetweet')(connection, redirectLogin, allQueries.queryDeleteATweet));
app.use('/about', require('./routes/about')(redirectLogin))
/**
 * Listen
 */
app.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`);
});