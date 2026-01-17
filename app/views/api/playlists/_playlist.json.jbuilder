json.extract! playlist, :id, :title, :private, :user_id, :created_at, :updated_at
json.owner playlist.user.username
json.songs playlist.songs do |song|
  json.partial! "api/songs/song", song: song
end
