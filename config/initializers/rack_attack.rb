# Rack::Attack configuration for rate limiting and throttling
class Rack::Attack
  # Throttle login attempts by IP address
  # Allow 5 requests per 20 seconds per IP for login
  throttle('login/ip', limit: 5, period: 20.seconds) do |req|
    if req.path == '/api/session' && req.post?
      req.ip
    end
  end

  # Throttle signup attempts by IP address
  # Allow 3 signups per hour per IP
  throttle('signup/ip', limit: 3, period: 1.hour) do |req|
    if req.path == '/api/users' && req.post?
      req.ip
    end
  end

  # Throttle general API requests
  # Allow 300 requests per 5 minutes per IP
  throttle('api/ip', limit: 300, period: 5.minutes) do |req|
    req.ip if req.path.start_with?('/api/')
  end

  # Block requests from known bad actors (optional - add IPs as needed)
  # blocklist('block bad IPs') do |req|
  #   # Block if IP is in the bad_ips array
  #   ['1.2.3.4', '5.6.7.8'].include?(req.ip)
  # end

  # Response when throttled
  self.throttled_responder = lambda do |env|
    retry_after = env['rack.attack.match_data'][:period]
    [
      429,
      { 'Content-Type' => 'application/json', 'Retry-After' => retry_after.to_s },
      [{ error: 'Rate limit exceeded. Please try again later.' }.to_json]
    ]
  end
end

# Enable Rack::Attack middleware
Rails.application.config.middleware.use Rack::Attack
