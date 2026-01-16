json.extract! song, :id, :artist_id, :genre, :title, :updated_at, :waveform
json.fileUrl rails_blob_url(song.file)
json.photoUrl rails_blob_url(song.photo)
json.artist song.artist.username