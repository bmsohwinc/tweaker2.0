create table tweets (
    tweet_id int PRIMARY key,
    tweet_msg VARCHAR(500),
    user_id int not null,
    date_of_tweet date not null,
    number_of_likes int not NULL,
    FOREIGN key (user_id) REFERENCES user_profile(user_id)
);
