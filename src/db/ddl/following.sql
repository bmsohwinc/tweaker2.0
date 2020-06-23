CREATE table following(
    user_id int,
    follows_id int,
    FOREIGN key (user_id) REFERENCES user_profile(user_id) on DELETE CASCADE,
    FOREIGN key (follows_id) REFERENCES user_profile(user_id) on DELETE CASCADE
);