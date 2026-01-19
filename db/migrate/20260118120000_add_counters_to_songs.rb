class AddCountersToSongs < ActiveRecord::Migration[7.1]
  def up
    add_column :songs, :likes_count, :integer, default: 0, null: false
    add_column :songs, :reposts_count, :integer, default: 0, null: false

    execute <<~SQL.squish
      UPDATE songs
      SET likes_count = (
        SELECT COUNT(*)
        FROM likes
        WHERE likes.song_id = songs.id
      )
    SQL

    execute <<~SQL.squish
      UPDATE songs
      SET reposts_count = (
        SELECT COUNT(*)
        FROM reposts
        WHERE reposts.song_id = songs.id
      )
    SQL
  end

  def down
    remove_column :songs, :likes_count
    remove_column :songs, :reposts_count
  end
end
