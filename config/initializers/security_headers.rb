# Security headers configuration
Rails.application.config.action_dispatch.default_headers.merge!(
  'X-Frame-Options' => 'SAMEORIGIN',
  'X-Content-Type-Options' => 'nosniff',
  'X-XSS-Protection' => '1; mode=block',
  'Referrer-Policy' => 'strict-origin-when-cross-origin'
)

# Content Security Policy (CSP)
# This helps prevent XSS attacks by controlling which resources can be loaded
Rails.application.config.content_security_policy do |policy|
  policy.default_src :self, :https
  policy.font_src    :self, :https, :data
  policy.img_src     :self, :https, :data, 'blob:', '*.s3.amazonaws.com', '*.s3-us-west-1.amazonaws.com'
  policy.object_src  :none
  policy.script_src  :self, :https
  policy.style_src   :self, :https, :unsafe_inline  # unsafe-inline needed for some CSS
  policy.media_src   :self, :https, 'blob:', '*.s3.amazonaws.com', '*.s3-us-west-1.amazonaws.com'
  policy.connect_src :self, :https, '*.s3.amazonaws.com', '*.s3-us-west-1.amazonaws.com'

  # Specify URI for violation reports
  # policy.report_uri "/csp-violation-report-endpoint"
end

# Generate session nonces for permitted importmap and inline scripts
Rails.application.config.content_security_policy_nonce_generator = ->(request) { request.session.id.to_s }
Rails.application.config.content_security_policy_nonce_directives = %w(script-src)

# Report violations without enforcing policy (useful for testing)
# Rails.application.config.content_security_policy_report_only = true

