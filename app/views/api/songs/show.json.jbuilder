# json.photoUrls @post.photos.map { |file| url_for(file) }
json.partial! 'api/songs/song', song: @song