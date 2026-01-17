require "test_helper"

class LikeTest < ActiveSupport::TestCase
  test "valid like with user and song" do
    like = Like.new(user: users(:one), song: songs(:two))
    assert like.valid?
  end

  test "invalid without user" do
    like = Like.new(song: songs(:two))
    refute like.valid?
    assert_includes like.errors[:user], "must exist"
  end

  test "prevents duplicate likes for same user and song" do
    Like.create!(user: users(:one), song: songs(:two))
    duplicate = Like.new(user: users(:one), song: songs(:two))
    refute duplicate.valid?
    assert_includes duplicate.errors[:song_id], "has already been taken"
  end
end
