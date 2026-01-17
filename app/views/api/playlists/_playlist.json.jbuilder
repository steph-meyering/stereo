json.extract! playlist, :id, :title, :private, :user_id, :created_at, :updated_at
json.owner playlist.user.username
json.songs playlist.playlist_songs.order(:position) do |playlist_song|
  json.position playlist_song.position
  json.song do
    json.partial! "api/songs/song", song: playlist_song.song
  end
end
