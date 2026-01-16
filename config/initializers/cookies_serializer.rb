# Be sure to restart your server when you modify this file.

# Specify a serializer for the signed and encrypted cookie jars.
# Valid options are :json, :marshal, and :hybrid.
Rails.application.config.action_dispatch.cookies_serializer = :json

# Note: For production, ensure you're using Rails 6.1+ with proper OpenSSL 3.x support
# The development workaround below should NOT be used in production
if Rails.env.development?
  # Workaround for OpenSSL 3.x compatibility issues with Rails 6.1 on development machines
  # TODO: Remove this once all dev environments are using compatible OpenSSL versions
  Rails.application.config.action_dispatch.use_authenticated_cookie_encryption = false
end
