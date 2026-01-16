# AWS S3 Setup Instructions

## Step 1: Create .env file

Create a `.env` file in the project root with your AWS credentials:

```bash
# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_REGION=us-west-1
AWS_DEV_BUCKET=your-dev-bucket-name
AWS_PROD_BUCKET=your-prod-bucket-name
AWS_SEED_BUCKET=your-seed-bucket-name
```

## Step 2: Restart the Rails server

After creating the `.env` file, restart the server with the environment variables loaded:

```bash
export $(cat .env | xargs) && \
export PATH="$HOME/.gem/ruby/2.6.0/bin:$PATH" && \
export SECRET_KEY_BASE=$(openssl rand -hex 64) && \
bundle exec rails server
```

## Step 3: Run the seeds

Once the server is connected to S3, you can populate the database:

```bash
export $(cat .env | xargs) && \
export PATH="$HOME/.gem/ruby/2.6.0/bin:$PATH" && \
bundle exec rails db:seed
```

## Notes

- The `.env` file is gitignored and won't be committed
- You can find your AWS credentials in the AWS IAM console
- Make sure your S3 buckets are in the correct region


