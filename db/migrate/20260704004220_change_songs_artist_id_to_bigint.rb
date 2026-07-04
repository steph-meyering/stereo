class ChangeSongsArtistIdToBigint < ActiveRecord::Migration[7.1]
  # No orphaned songs found (count = 0), so no cleanup step needed.
  def up
    change_column :songs, :artist_id, :bigint
    add_foreign_key :songs, :users, column: :artist_id
  end

  def down
    remove_foreign_key :songs, column: :artist_id
    change_column :songs, :artist_id, :integer
  end
end
