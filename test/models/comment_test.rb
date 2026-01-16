# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  song_id    :bigint           not null
#  user_id    :bigint           not null
#  body       :text             not null
#  song_time  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  include ActionDispatch::TestProcess

  setup do
    @user = User.new(username: "commenter", email: "commenter@example.com")
    @user.password = "password"
    @user.save!
    @song = build_song
    @song.save!
  end

  test "valid comment with body and song_time" do
    comment = Comment.new(user_id: @user.id, song_id: @song.id, body: "Nice track!", song_time: 10)
    assert comment.valid?
  end

  test "invalid without body" do
    comment = Comment.new(user_id: @user.id, song_id: @song.id, song_time: 10)
    refute comment.valid?
    assert_includes comment.errors[:body], "can't be blank"
  end

  test "invalid when body is too long" do
    comment = Comment.new(user_id: @user.id, song_id: @song.id, body: "a" * 1001, song_time: 10)
    refute comment.valid?
    assert_includes comment.errors[:body], "is too long (maximum is 1000 characters)"
  end

  test "sanitizes body by stripping HTML" do
    comment = Comment.new(user_id: @user.id, song_id: @song.id, body: "<script>alert(1)</script> great", song_time: 10)
    comment.valid?
    assert_equal "alert(1) great", comment.body
  end

  private

  def build_song
    song = Song.new(artist_id: @user.id, title: "Test Song", genre: "test")
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
    song
  end
end
