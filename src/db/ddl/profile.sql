create table user_profile(
    user_id int PRIMARY KEY,
    user_name VARCHAR(20) unique not null,
    full_name VARCHAR(20) not null,
    place VARCHAR(20),
    phone_number int,
    profile_pic_path VARCHAR(30),
    about VARCHAR(300),
    user_password VARCHAR(20)
);