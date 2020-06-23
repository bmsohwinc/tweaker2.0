create table deletedprofiles (
    user_id int,
    FOREIGN key (user_id) REFERENCES user_profile(user_id)
);