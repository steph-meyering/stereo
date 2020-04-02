json.extract! song, :id, :artist_id, :genre, :title, :updated_at
json.fileUrl url_for(song.file)
json.photoUrl url_for(song.photo)
json.artist song.artist.username