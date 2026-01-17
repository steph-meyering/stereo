require "test_helper"

class PlaylistSongsApiTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @playlist = playlists(:one)
    @song = songs(:two)
    attach_song_assets(songs(:one))
    attach_song_assets(songs(:two))
  end

  test "add song requires authentication" do
    post "/api/playlists/#{@playlist.id}/playlist_songs", params: {
      playlist_song: { song_id: @song.id, position: 2 }
    }, as: :json
    assert_response :unauthorized
  end

  test "user can add song to playlist" do
    PlaylistSong.delete_all
    sign_in_as(@user)
    assert_difference "PlaylistSong.count", 1 do
      post "/api/playlists/#{@playlist.id}/playlist_songs", params: {
        playlist_song: { song_id: @song.id, position: 2 }
      }, as: :json
    end
    assert_response :success
  end

  test "user can reorder playlist song" do
    sign_in_as(@user)
    playlist_song = playlist_songs(:one)
    patch "/api/playlists/#{@playlist.id}/playlist_songs/#{playlist_song.song_id}", params: {
      playlist_song: { position: 3 }
    }, as: :json
    assert_response :success
    assert_equal 3, playlist_song.reload.position
  end

  test "user can remove song from playlist" do
    sign_in_as(@user)
    playlist_song = playlist_songs(:one)
    assert_difference "PlaylistSong.count", -1 do
      delete "/api/playlists/#{@playlist.id}/playlist_songs/#{playlist_song.song_id}", as: :json
    end
    assert_response :success
  end

  private

  def attach_song_assets(song)
    return if song.file.attached? && song.photo.attached?
    song.file.attach(
      io: File.open(Rails.root.join("test/fixtures/files/sample.mp3")),
      filename: "sample.mp3",
      content_type: "audio/mpeg"
    )
    song.photo.attach(
      io: File.open(Rails.root.join("test/fixtures/files/cover.jpg")),
      filename: "cover.jpg",
      content_type: "image/jpeg"
    )
  end
end
