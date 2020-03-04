# HTML

* GET / StaticPagesController#root

# API Endpoints

## `users`

* `GET /api/users/:song_id` - return user data and uploaded songs
* `POST /api/users` - sign up

## `session`

* `POST /api/session` - log in
* `DELETE /api/session` - log out

## `songs`

* `GET /api/songs` - songs index (/stream)
* `POST /api/songs` - upload song
* `GET /api/songs/:song_id` - read song
* `PATCH /api/songs/:song_id` - update song
* `DELETE /api/songs` - delete song