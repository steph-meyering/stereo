json.extract! song, :id, :artist_id, :genre, :title, :updated_at, :file, :photo
json.fileUrl url_for(song.file)
json.photoUrl url_for(song.photo)