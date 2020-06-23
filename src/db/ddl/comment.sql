create table comments (
    comment_id int PRIMARY key,
    user_id int,
    tweet_id int,
    date_of_comment date,
    number_of_likes int,
    comment_data varchar(200),
    FOREIGN key (user_id) REFERENCES user_profile(user_id),
    FOREIGN KEY (tweet_id) REFERENCES tweets(tweet_id) on delete CASCADE
);