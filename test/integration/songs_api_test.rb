require "test_helper"

class SongsApiTest < ActionDispatch::IntegrationTest
  include ActionDispatch::TestProcess

  setup do
    @user = User.new(username: "artist", email: "artist_api@example.com")
    @user.password = "password"
    @user.save!

    @other = User.new(username: "other", email: "other_api@example.com")
    @other.password = "password"
    @other.save!

    # Ensure existing fixture songs have attachments to avoid nil blobs in JSON
    Song.find_each do |song|
      next if song.file.attached? && song.photo.attached?
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

  test "index returns songs" do
    get "/api/songs", as: :json
    assert_response :success
  end

  test "create requires authentication" do
    post "/api/songs", params: { song: { title: "Nope", genre: "test" } }, as: :json
    assert_response :unauthorized
  end

  test "create song succeeds with attachments" do
    sign_in_as(@user)

    assert_difference "Song.count", 1 do
      post "/api/songs", params: { song: song_params }, headers: { "ACCEPT" => "application/json" }
    end

    assert_response :success
  end

  test "owner can update song" do
    sign_in_as(@user)
    song = create_song_for(@user)

    patch "/api/songs/#{song.id}", params: { song: { title: "Updated Title" } }, as: :json
    assert_response :success
    assert_equal "Updated Title", song.reload.title
  end

  test "non-owner cannot update song" do
    song = create_song_for(@user)
    sign_in_as(@other)

    patch "/api/songs/#{song.id}", params: { song: { title: "Hacked" } }, as: :json
    assert_response :forbidden
  end

  test "owner can delete song" do
    sign_in_as(@user)
    song = create_song_for(@user)

    assert_difference "Song.count", -1 do
      delete "/api/songs/#{song.id}", as: :json
    end

    assert_response :success
  end

  private

  def song_params
    {
      title: "API Song",
      genre: "test",
      file: Rack::Test::UploadedFile.new(
        Rails.root.join("test/fixtures/files/sample.mp3"),
        "audio/mpeg"
      ),
      photo: Rack::Test::UploadedFile.new(
        Rails.root.join("test/fixtures/files/cover.jpg"),
        "image/jpeg"
      )
    }
  end

  def create_song_for(user)
    song = Song.new(artist_id: user.id, title: "Seed", genre: "test")
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
    song.save!
    song
  end
end
