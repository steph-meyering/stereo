require "test_helper"

class PlaylistSongTest < ActiveSupport::TestCase
  test "valid playlist song with playlist and song" do
    playlist_song = PlaylistSong.new(playlist: playlists(:two), song: songs(:two), position: 1)
    assert playlist_song.valid?
  end

  test "invalid without playlist" do
    playlist_song = PlaylistSong.new(song: songs(:two))
    refute playlist_song.valid?
    assert_includes playlist_song.errors[:playlist], "must exist"
  end
end
