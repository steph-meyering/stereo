# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  location        :string
#  admin           :boolean          default(FALSE)
#  about           :text
#  password_digest :string           not null
#  session_token   :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "valid user with username, email, and password" do
    user = User.new(username: "valid_user", email: "valid_user@example.com")
    user.password = "password"
    assert user.valid?
  end

  test "invalid without email" do
    user = User.new(username: "no_email")
    user.password = "password"
    refute user.valid?
    assert_includes user.errors[:email], "can't be blank"
  end

  test "invalid with malformed email" do
    user = User.new(username: "bad_email", email: "not-an-email")
    user.password = "password"
    refute user.valid?
    assert_includes user.errors[:email], "must be a valid email address"
  end

  test "generates session token on initialize" do
    user = User.new(username: "token_user", email: "token_user@example.com")
    user.password = "password"
    user.valid?
    assert user.session_token.present?
  end

  test "find_by_credentials returns user with correct password" do
    user = User.new(username: "auth_user", email: "auth_user@example.com")
    user.password = "password"
    user.save!

    found = User.find_by_credentials("auth_user", "password")
    assert_equal user, found
  end
end
