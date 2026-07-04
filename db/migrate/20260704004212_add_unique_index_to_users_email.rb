class AddUniqueIndexToUsersEmail < ActiveRecord::Migration[7.1]
  def up
    # Defensively deduplicate emails before adding unique index.
    # Keep the oldest row per lower(email); rewrite later duplicates so they
    # are unique: local+dup<id>@domain.
    execute <<~SQL
      WITH dupes AS (
        SELECT id,
               email,
               ROW_NUMBER() OVER (PARTITION BY lower(email) ORDER BY id ASC) AS rn
        FROM users
      )
      UPDATE users
      SET email = split_part(dupes.email, '@', 1)
                  || '+dup' || dupes.id::text
                  || '@'
                  || split_part(dupes.email, '@', 2)
      FROM dupes
      WHERE users.id = dupes.id
        AND dupes.rn > 1;
    SQL

    # Case-sensitive unique index to match the existing Rails uniqueness validation.
    add_index :users, :email, unique: true
  end

  def down
    remove_index :users, :email
  end
end
