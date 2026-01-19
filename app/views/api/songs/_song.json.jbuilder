json.extract! song, :id, :artist_id, :genre, :title, :updated_at, :waveform
json.fileUrl rails_blob_url(song.file)
json.photoUrl rails_blob_url(song.photo)
json.artist song.artist.username
json.likeCount song.likes_count
json.liked current_user ? song.likes.exists?(user_id: current_user.id) : false
json.repostCount song.reposts_count
json.reposted current_user ? song.reposts.exists?(user_id: current_user.id) : false