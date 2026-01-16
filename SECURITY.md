# Security Documentation

## Overview
This document outlines the security measures implemented in the Stereo application.

## Critical Security Fixes Implemented

### 1. ✅ Dependency Vulnerabilities
- **Fixed**: Critical RCE vulnerability in `@babel/traverse` (CVE)
- **Fixed**: RegExp DoS in `@babel/helpers` and `@babel/runtime`
- **Action**: Run `npm audit` regularly to check for new vulnerabilities

### 2. ✅ CSRF Protection
- **Implementation**: Added `protect_from_forgery with: :null_session` for JSON API requests
- **Location**: `app/controllers/application_controller.rb`

### 3. ✅ Authentication & Authorization
- **Songs**: Users must be logged in to create/update/delete songs
- **Songs**: Users can only edit their own songs (or admins can edit any)
- **Comments**: Users must be logged in to create/update/delete comments
- **Comments**: Users can only edit their own comments (or admins can edit any)
- **Prevention**: Artist/user IDs are set from `current_user`, not from params

### 4. ✅ HTTPS Enforcement
- **Production**: Enabled `force_ssl = true` in production environment
- **Effect**: All traffic redirected to HTTPS, secure cookies enforced

### 5. ✅ Security Headers
Implemented in `config/initializers/security_headers.rb`:
- `X-Frame-Options: SAMEORIGIN` - Prevents clickjacking
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `X-XSS-Protection: 1; mode=block` - XSS protection
- `Referrer-Policy: strict-origin-when-cross-origin` - Privacy protection
- **Content Security Policy (CSP)** - Prevents XSS by controlling resource loading

### 6. ✅ Input Validation & Sanitization
- **Email**: Format validation using `URI::MailTo::EMAIL_REGEXP`
- **Comments**: Max 1000 characters, all HTML tags stripped
- **File Uploads**: 
  - Audio files: MP3, WAV, OGG, FLAC only, max 50MB
  - Images: JPEG, PNG, GIF, WebP only, max 5MB

### 7. ✅ Rate Limiting
Implemented using `rack-attack` gem:
- Login attempts: 5 per 20 seconds per IP
- Signup attempts: 3 per hour per IP
- General API: 300 requests per 5 minutes per IP
- **Response**: 429 status with retry-after header

## Remaining Security Considerations

### 🟡 Medium Priority

#### Version Updates
The application currently uses:
- Ruby 2.6.10 (EOL - end of life)
- Rails 6.1.x (should update to 7.x for latest security patches)
- Node.js 13.7.0 (EOL - end of life)

**Recommendation**: Plan an upgrade path to:
- Ruby 3.2+ or 3.3+
- Rails 7.1+
- Node.js 20 LTS or 22 LTS

**Note**: This requires significant testing and may involve breaking changes.

### 🟡 SQL Injection Prevention
Rails uses parameterized queries by default, which prevents SQL injection.

**Current Protection**:
- All ActiveRecord queries use parameter binding
- User inputs are never directly interpolated into SQL

**Verification**:
```ruby
# ✅ Safe (parameterized)
User.find_by(username: params[:username])
Song.where(genre: params[:genre])

# ❌ Unsafe (if we had this - we don't)
# User.where("username = '#{params[:username]}'")
```

**Test**: Run `grep -r "where.*\#{"` to find any unsafe queries (none found).

### 🟢 AWS S3 Security Review

#### Current Setup
- **Bucket**: `stereo-dev`, `stereo-prod`, `stereo-seeds`
- **Access**: Via IAM user `stereo-master` with access keys
- **Signed URLs**: Application generates signed URLs for private objects

#### Recommendations

1. **Bucket Policies**:
   - ✅ Keep buckets private (no public access)
   - ✅ Use signed URLs for temporary authenticated access
   - ⚠️ Review IAM user permissions - ensure least privilege

2. **IAM Best Practices**:
   ```
   Recommended IAM Policy:
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "s3:GetObject",
           "s3:PutObject",
           "s3:DeleteObject"
         ],
         "Resource": [
           "arn:aws:s3:::stereo-dev/*",
           "arn:aws:s3:::stereo-prod/*"
         ]
       },
       {
         "Effect": "Allow",
         "Action": ["s3:GetObject"],
         "Resource": ["arn:aws:s3:::stereo-seeds/*"]
       }
     ]
   }
   ```

3. **Access Keys**:
   - ⚠️ Rotate access keys regularly (every 90 days)
   - ✅ Never commit keys to git (enforced via .gitignore)
   - ✅ Use environment variables for credentials
   - 💡 Consider: Migrate to IAM roles instead of access keys (if on EC2/ECS)

4. **Bucket Security**:
   - ✅ Enable bucket versioning (for backup/recovery)
   - ✅ Enable server-side encryption (SSE-S3 or SSE-KMS)
   - ✅ Enable access logging for audit trails
   - ✅ Configure CORS only for your domain

5. **URL Security**:
   - ✅ Signed URLs expire (Rails default: 5 minutes)
   - ✅ No public access to buckets
   - 💡 Consider: CloudFront CDN for better performance and DDoS protection

#### AWS Security Checklist
- [ ] Review and restrict IAM policy to least privilege
- [ ] Enable S3 bucket versioning
- [ ] Enable S3 server-side encryption
- [ ] Enable S3 access logging
- [ ] Configure CORS to only allow your domain
- [ ] Set up CloudWatch alerts for unusual access patterns
- [ ] Rotate AWS access keys every 90 days
- [ ] Consider migrating to IAM roles (if using EC2/ECS/Lambda)

## Testing Security

### Manual Testing
1. **Authentication**: Try accessing protected endpoints without login
2. **Authorization**: Try editing another user's song/comment
3. **Rate Limiting**: Make repeated login attempts
4. **File Upload**: Try uploading non-audio/non-image files
5. **XSS**: Try posting comments with `<script>` tags

### Automated Testing
Add to your test suite:
```ruby
# test/integration/security_test.rb
class SecurityTest < ActionDispatch::IntegrationTest
  test "cannot update another user's song" do
    # Test authorization
  end

  test "cannot post comments without login" do
    # Test authentication
  end

  test "file upload validates content type" do
    # Test file validation
  end
end
```

## Monitoring

### Recommended Monitoring
1. **Failed login attempts** - Watch for brute force attacks
2. **Rate limit hits** - Monitor 429 responses
3. **File upload errors** - Watch for malicious file upload attempts
4. **S3 access logs** - Monitor for unusual access patterns
5. **Application errors** - Watch for SQL injection attempts (400/500 errors)

### Tools
- **Rails logs**: Check `log/production.log`
- **Rack::Attack**: Enable logging in `config/initializers/rack_attack.rb`
- **AWS CloudWatch**: Monitor S3 access and CloudFront (if used)
- **Sentry/Rollbar**: For error tracking and security incidents

## Security Contacts

### Reporting Vulnerabilities
If you discover a security vulnerability, please email: [your-email@example.com]

**Please do not**:
- Open public GitHub issues for security vulnerabilities
- Disclose vulnerabilities publicly before they are fixed

## References
- [Rails Security Guide](https://guides.rubyonrails.org/security.html)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [AWS S3 Security Best Practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html)
- [Rack::Attack Documentation](https://github.com/rack/rack-attack)
