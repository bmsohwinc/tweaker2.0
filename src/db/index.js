const queryForLogin = "select user_id from user_profile where user_name = ? and user_password = ?";
const queryForRegister = "insert into user_profile values (?, ?, ?, ?, ?, ?, ?, ?)";
const queryGetNumberOfUsers = "select count(*) as users_count from user_profile";
const queryGetUserForUsername = "select count(*) as user_count from user_profile where user_name = ?";

const queryGetUserProfile = "select * from user_profile where user_id = ?";
const queryGetUserTweets = "select * from tweets where user_id = ? and tweet_id is not null";
const queryGetUserComments = "select * from comments where user_id = ? and comment_id is not null";
// const queryGetFollowings = "select u.user_id, u.full_name, u.user_name from following f left join user_profile u on f.follows_id = u.user_id where f.user_id = ? and u.user_id is not null";
// const queryGetFollowers = "select u.user_id, u.full_name, u.user_name from following f left join user_profile u on f.user_id = u.user_id where f.follows_id = ? and u.user_id is not null";
const queryGetFollowings = "select a.user_id, a.full_name, a.user_name, b.count from (select u.user_id, u.full_name, u.user_name from following f left join user_profile u on f.follows_id = u.user_id where f.user_id = ? and u.user_id is not null) a left join (select t.user_name, t.user_id,  count(*) as count from (select u.user_name, u.user_id from user_profile u left join following f on f.follows_id = u.user_id where f.follows_id is not null) t group by t.user_name) b on a.user_id = b.user_id";
const queryGetFollowers = "select a.user_id, a.full_name, a.user_name, b.count from (select u.user_id, u.full_name, u.user_name from following f left join user_profile u on f.user_id = u.user_id where f.follows_id = ? and u.user_id is not null) a left join (select t.user_name, t.user_id,  count(*) as count from (select u.user_name, u.user_id from user_profile u left join following f on f.follows_id = u.user_id where f.follows_id is not null) t group by t.user_name) b on a.user_id = b.user_id";
const newQ = "select t.user_name, t.user_id,  count(*) from (select u.user_name, u.user_id from user_profile u left join following f on f.follows_id = u.user_id where f.follows_id is not null) t group by user_name";

const queryUpdateUserProfile = "update user_profile set full_name = ?, place = ?, phone_number = ?, about = ? where user_id = ?";
const queryDeleteUser = "insert into deletedprofiles values (?)";
const queryCheckDeletedUser = "select * from deletedprofiles where user_id = ?";

const queryNewTweet = "insert into tweets values (?, ?, ?, ?, ?)";
const queryGetNumberOfTweets = "select count(*) as count from tweets";

const queryAllUsersWithFollowersCount = "select u.*, sum(f.follows_id is not null) as followers_count from user_profile u left join following f on u.user_id = f.follows_id group by u.user_name";

const queryAddFollower = "insert into following values (?, ?)";
const queryDeleteFollower = "delete from following where user_id = ? and follows_id = ?";

const queryGetTweetAndUser = "select t.*, u.* from tweets t left join user_profile u on t.user_id = u.user_id where t.tweet_id = ?";
const queryGetCommentsAndUsers = "select c.*, u.* from comments c left join user_profile u on c.user_id = u.user_id where c.tweet_id = ?";
const queryLikeATweet = "update tweets set number_of_likes = number_of_likes + 1 where tweet_id = ?";
const queryAddCommentToTweet = "insert into comments values (?, ?, ?, ?, ?, ?)";
const queryGetNumberOfComments = "select count(*) as count from comments";
const queryLikeAComment = "update comments set number_of_likes = number_of_likes + 1 where comment_id = ?";

const queryEditATweet = "update tweets set tweet_msg = ? where tweet_id = ?";
const queryDeleteATweet = "delete from tweets where tweet_id = ?";

const queryGetFollowingsTweets = "select u.*, t.* from user_profile u left join tweets t on u.user_id = t.user_id where u.user_id in (select f.follows_id from following f where f.user_id = ? and f.follows_id is not null) and t.tweet_id is not null order by t.date_of_tweet desc";
const queryGetSuggestions = "select distinct u.* from following f2 left join user_profile u on f2.follows_id = u.user_id where f2.user_id in ( select f.follows_id from following f where f.user_id = ? and f.follows_id is not null ) and f2.follows_id not in ( select f.follows_id from following f where f.user_id = ? and f.follows_id is not null ) and f2.follows_id is not null";
const queryGetTweetsAndUserForUserId = "select u.*, t.* from user_profile u left join tweets t on u.user_id = t.user_id where u.user_id = ? order by t.date_of_tweet";

module.exports = {
    queryForLogin,
    queryForRegister,
    queryGetNumberOfUsers,
    queryGetUserForUsername,
    queryGetUserProfile,
    queryGetUserTweets,
    queryGetUserComments,
    queryGetFollowings,
    queryGetFollowers,
    queryUpdateUserProfile,
    queryDeleteUser,
    queryCheckDeletedUser,
    queryNewTweet,
    queryGetNumberOfTweets,
    queryAllUsersWithFollowersCount,
    queryAddFollower,
    queryDeleteFollower,
    queryGetTweetAndUser,
    queryGetCommentsAndUsers,
    queryLikeATweet,
    queryAddCommentToTweet,
    queryGetNumberOfComments,
    queryLikeAComment,
    queryEditATweet,
    queryDeleteATweet,
    queryGetFollowingsTweets,
    queryGetSuggestions,
    queryGetTweetsAndUserForUserId
};