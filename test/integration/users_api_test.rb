require "test_helper"

class UsersApiTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @other_user = users(:two)
  end

  test "public user show does not expose email or admin" do
    get "/api/users/#{@user.id}", as: :json
    assert_response :success
    assert_equal @user.username, json_response["username"]
    assert_nil json_response["email"]
    assert_nil json_response["admin"]
  end

  test "session create returns email and admin for current user" do
    sign_in_as(@user)
    assert_equal @user.email, json_response["email"]
    assert_includes [true, false], json_response["admin"]
  end

  test "signup returns current user shape" do
    post "/api/users", params: {
      user: { username: "new_user", email: "new_user@example.com", password: "password" }
    }, as: :json
    assert_response :success
    assert_equal "new_user@example.com", json_response["email"]
  end

  test "update requires authentication" do
    patch "/api/users/#{@user.id}", params: { user: { location: "Berlin" } }, as: :json
    assert_response :unauthorized
  end

  test "user can update own profile" do
    sign_in_as(@user)
    patch "/api/users/#{@user.id}", params: {
      user: { location: "Berlin", about: "Producer" }
    }, as: :json
    assert_response :success
    @user.reload
    assert_equal "Berlin", @user.location
    assert_equal "Producer", @user.about
    assert_equal @user.email, json_response["email"]
  end

  test "user cannot update another user's profile" do
    sign_in_as(@user)
    patch "/api/users/#{@other_user.id}", params: { user: { location: "Hacked" } }, as: :json
    assert_response :forbidden
    assert_not_equal "Hacked", @other_user.reload.location
  end

  test "user can change password and log in with it" do
    sign_in_as(@user)
    patch "/api/users/#{@user.id}", params: { user: { password: "newpassword" } }, as: :json
    assert_response :success
    sign_out
    sign_in_as(@user, password: "newpassword")
  end

  test "blank password is ignored on update" do
    sign_in_as(@user)
    patch "/api/users/#{@user.id}", params: { user: { password: "", location: "Oslo" } }, as: :json
    assert_response :success
    assert_equal "Oslo", @user.reload.location
    sign_out
    sign_in_as(@user)
  end
end
