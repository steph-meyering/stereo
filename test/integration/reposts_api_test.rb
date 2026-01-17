require "test_helper"

class RepostsApiTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @song = songs(:one)
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

  test "repost requires authentication" do
    post "/api/songs/#{@song.id}/repost", as: :json
    assert_response :unauthorized
  end

  test "user can repost a song" do
    Repost.delete_all
    sign_in_as(@user)
    assert_difference "Repost.count", 1 do
      post "/api/songs/#{@song.id}/repost", as: :json
    end
    assert_response :success
  end

  test "user can undo a repost" do
    Repost.delete_all
    Repost.create!(user: @user, song: @song)
    sign_in_as(@user)
    assert_difference "Repost.count", -1 do
      delete "/api/songs/#{@song.id}/repost", as: :json
    end
    assert_response :success
  end
end
