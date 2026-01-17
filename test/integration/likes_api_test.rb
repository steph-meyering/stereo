require "test_helper"

class LikesApiTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @song = songs(:two)
    unless @song.file.attached? && @song.photo.attached?
      @song.file.attach(
        io: File.open(Rails.root.join("test/fixtures/files/sample.mp3")),
        filename: "sample.mp3",
        content_type: "audio/mpeg"
      )
      @song.photo.attach(
        io: File.open(Rails.root.join("test/fixtures/files/cover.jpg")),
        filename: "cover.jpg",
        content_type: "image/jpeg"
      )
    end
  end

  test "like requires authentication" do
    post "/api/songs/#{@song.id}/like", as: :json
    assert_response :unauthorized
  end

  test "user can like a song" do
    sign_in_as(@user)
    assert_difference "Like.count", 1 do
      post "/api/songs/#{@song.id}/like", as: :json
    end
    assert_response :success
  end

  test "user can unlike a song" do
    Like.create!(user: @user, song: @song)
    sign_in_as(@user)
    assert_difference "Like.count", -1 do
      delete "/api/songs/#{@song.id}/like", as: :json
    end
    assert_response :success
  end
end
