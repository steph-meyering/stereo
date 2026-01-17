json.extract! comment, :id, :user_id, :song_id, :body, :song_time, :updated_at
json.songTime comment.song_time
json.updatedAt comment.updated_at
json.commenter comment.user.username