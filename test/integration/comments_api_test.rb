require "test_helper"

class CommentsApiTest < ActionDispatch::IntegrationTest
  include ActionDispatch::TestProcess

  setup do
    @user = User.new(username: "commenter", email: "commenter_api@example.com")
    @user.password = "password"
    @user.save!

    @other = User.new(username: "other_commenter", email: "other_commenter@example.com")
    @other.password = "password"
    @other.save!

    @song = create_song_for(@user)
  end

  test "create requires authentication" do
    post "/api/songs/#{@song.id}/comments", params: {
      comment: { song_id: @song.id, body: "hi", song_time: 5 }
    }, as: :json
    assert_response :unauthorized
  end

  test "create comment succeeds when logged in" do
    sign_in_as(@user)

    assert_difference "Comment.count", 1 do
      post "/api/songs/#{@song.id}/comments", params: {
        comment: { song_id: @song.id, body: "Great track", song_time: 5 }
      }, as: :json
    end

    assert_response :success
  end

  test "owner can update comment" do
    sign_in_as(@user)
    comment = Comment.create!(song_id: @song.id, user_id: @user.id, body: "old", song_time: 3)

    patch "/api/songs/#{@song.id}/comments/#{comment.id}", params: {
      comment: { body: "updated" }
    }, as: :json

    assert_response :success
    assert_equal "updated", comment.reload.body
  end

  test "non-owner cannot update comment" do
    comment = Comment.create!(song_id: @song.id, user_id: @user.id, body: "old", song_time: 3)
    sign_in_as(@other)

    patch "/api/songs/#{@song.id}/comments/#{comment.id}", params: {
      comment: { body: "hacked" }
    }, as: :json

    assert_response :forbidden
  end

  test "owner can delete comment" do
    sign_in_as(@user)
    comment = Comment.create!(song_id: @song.id, user_id: @user.id, body: "old", song_time: 3)

    assert_difference "Comment.count", -1 do
      delete "/api/songs/#{@song.id}/comments/#{comment.id}", as: :json
    end

    assert_response :success
  end

  private

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
