json.extract! song, :id, :artist_id, :genre, :title, :updated_at, :file
json.fileUrl url_for(song.file)