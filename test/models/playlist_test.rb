require "test_helper"

class PlaylistTest < ActiveSupport::TestCase
  test "valid playlist with title and user" do
    playlist = Playlist.new(user: users(:one), title: "My Playlist")
    assert playlist.valid?
  end

  test "invalid without title" do
    playlist = Playlist.new(user: users(:one))
    refute playlist.valid?
    assert_includes playlist.errors[:title], "can't be blank"
  end
end
