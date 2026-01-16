ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

Rails.application.routes.default_url_options[:host] = "example.com"

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end

class ActionDispatch::IntegrationTest
  def sign_in_as(user, password: "password")
    post "/api/session", params: { user: { username: user.username, password: password } }, as: :json
    assert_response :success
  end

  def sign_out
    delete "/api/session", as: :json
  end

  def json_response
    JSON.parse(response.body)
  end
end
