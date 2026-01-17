class CreatePlaylistSongs < ActiveRecord::Migration[7.1]
  def change
    create_table :playlist_songs do |t|
      t.references :playlist, null: false, foreign_key: true
      t.references :song, null: false, foreign_key: true
      t.integer :position, null: false, default: 1

      t.timestamps
    end
    add_index :playlist_songs, [:playlist_id, :song_id], unique: true
    add_index :playlist_songs, [:playlist_id, :position]
  end
end
