class EnforceNotNullSessionToken < ActiveRecord::Migration[7.1]
  def up
    # Backfill any NULL session_tokens before enforcing NOT NULL.
    execute <<~SQL
      UPDATE users
      SET session_token = md5(random()::text || clock_timestamp()::text)
      WHERE session_token IS NULL;
    SQL

    change_column_null :users, :session_token, false
  end

  def down
    change_column_null :users, :session_token, true
  end
end
