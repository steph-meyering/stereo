# Be sure to restart your server when you modify this file.

# Specify a serializer for the signed and encrypted cookie jars.
# Valid options are :json, :marshal, and :hybrid.
Rails.application.config.action_dispatch.cookies_serializer = :json

# Workaround for OpenSSL 3.x compatibility issues with Rails 5.2
# Use legacy digest for development
if Rails.env.development?
  Rails.application.config.action_dispatch.use_authenticated_cookie_encryption = false
end
