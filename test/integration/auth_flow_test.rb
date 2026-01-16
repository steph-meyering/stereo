require "test_helper"

class AuthFlowTest < ActionDispatch::IntegrationTest
  test "user signup succeeds" do
    post "/api/users", params: {
      user: { username: "new_user", email: "new_user@example.com", password: "password" }
    }, as: :json

    assert_response :success
    assert_equal "new_user", json_response["username"]
  end

  test "login succeeds with valid credentials" do
    user = User.new(username: "login_user", email: "login_user@example.com")
    user.password = "password"
    user.save!

    post "/api/session", params: {
      user: { username: "login_user", password: "password" }
    }, as: :json

    assert_response :success
    assert_equal "login_user", json_response["username"]
  end

  test "login fails with invalid credentials" do
    post "/api/session", params: {
      user: { username: "missing_user", password: "bad" }
    }, as: :json

    assert_response :unauthorized
  end
end
