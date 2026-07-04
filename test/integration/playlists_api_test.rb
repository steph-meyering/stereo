require "test_helper"

class PlaylistsApiTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @playlist = playlists(:one)
    attach_song_assets(songs(:one))
    attach_song_assets(songs(:two))
  end

  test "create playlist requires authentication" do
    post "/api/playlists", params: { playlist: { title: "New" } }, as: :json
    assert_response :unauthorized
  end

  test "user can create playlist" do
    sign_in_as(@user)
    assert_difference "Playlist.count", 1 do
      post "/api/playlists", params: { playlist: { title: "New Playlist" } }, as: :json
    end
    assert_response :success
  end

  test "user can update playlist" do
    sign_in_as(@user)
    patch "/api/playlists/#{@playlist.id}", params: { playlist: { title: "Renamed" } }, as: :json
    assert_response :success
    assert_equal "Renamed", @playlist.reload.title
  end

  test "user can delete playlist" do
    sign_in_as(@user)
    assert_difference "Playlist.count", -1 do
      delete "/api/playlists/#{@playlist.id}", as: :json
    end
    assert_response :success
  end

  test "index hides private playlists from anonymous users" do
    get "/api/playlists", as: :json
    assert_response :success
    titles = json_response.map { |p| p["title"] }
    assert_includes titles, playlists(:one).title
    assert_not_includes titles, playlists(:two).title
  end

  test "index hides private playlists from non-owners" do
    sign_in_as(@user)
    get "/api/playlists", as: :json
    assert_response :success
    titles = json_response.map { |p| p["title"] }
    assert_not_includes titles, playlists(:two).title
  end

  test "index shows own private playlists to owner" do
    sign_in_as(users(:two))
    get "/api/playlists", as: :json
    assert_response :success
    titles = json_response.map { |p| p["title"] }
    assert_includes titles, playlists(:two).title
  end

  test "show returns 404 for private playlist to anonymous users" do
    get "/api/playlists/#{playlists(:two).id}", as: :json
    assert_response :not_found
  end

  test "show returns 404 for private playlist to non-owners" do
    sign_in_as(@user)
    get "/api/playlists/#{playlists(:two).id}", as: :json
    assert_response :not_found
  end

  test "show returns private playlist to owner" do
    sign_in_as(users(:two))
    get "/api/playlists/#{playlists(:two).id}", as: :json
    assert_response :success
    assert_equal playlists(:two).title, json_response["title"]
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
