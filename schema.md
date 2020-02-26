# Database Schema

## users

| column name     | data type     | details                   |
|-----------------|---------------|---------------------------|
| id              | integer       | not null, primary key     |
| username        | string        | not null, indexed, unique |
| email           | string        | not null, indexed, unique |
| location        | string        | not null                  |
| artist          | boolean       | not null                  |
| about           | text          |                           |
| password_digest | string        | not null                  |
| session_token   | string        | not null, indexed, unique |
| profile_pic     | ActiveStorage |                           |
| cover_pic       | ActiveStorage |                           |
| created_at      | datetime      | not null                  |
| updated_at      | datetime      | not null                  |


* index on `username, unique: true`
* index on `email, unique: true`
* index on `session_token, unique: true`
* thoughts:  create additional mini-profile-pic for use as comment icons


## songs

| column name | data type     | details               |
|-------------|---------------|-----------------------|
| id          | integer       | not null, primary key |
| artist_id   | integer       | not null, foreign key |
| song_name   | string        | not null              |
| cover_pic   | ActiveStorage |                       |
| song_data   | ActiveStorage |                       |
| genre       | string        | not null              |
| created_at  | datetime      | not null              |
| updated_at  | datetime      | not null              |

## comments

| column name    | data type | details               |
|----------------|-----------|-----------------------|
| id             | integer   | not null, primary key |
| author_id      | integer   | not null, foreign key |
| song_id        | integer   | not null, foreign key |
| song_timestamp | integer   |                       |
| body           | string    | max chars?            |
| created_at     | datetime  | not null              |
| updated_at     | datetime  | not null              |

* thoughts: best datatype to store song_timestamp? datetime? integer?

## reposts

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| user_id     | integer   | not null, foreign key |
| song_id     | integer   | not null, foreign key |
| created_at  | datetime  | not null              |
| updated_at  | datetime  | not null              |
