require "test_helper"

class RepostTest < ActiveSupport::TestCase
  test "valid repost with user and song" do
    repost = Repost.new(user: users(:two), song: songs(:two))
    assert repost.valid?
  end

  test "invalid without user" do
    repost = Repost.new(song: songs(:two))
    refute repost.valid?
    assert_includes repost.errors[:user], "must exist"
  end

  test "prevents duplicate reposts for same user and song" do
    repost = Repost.new(user: users(:two), song: songs(:two))
    repost.save!
    duplicate = Repost.new(user: users(:two), song: songs(:two))
    refute duplicate.valid?
    assert_includes duplicate.errors[:song_id], "has already been taken"
  end
end
