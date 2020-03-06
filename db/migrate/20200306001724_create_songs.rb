class CreateSongs < ActiveRecord::Migration[5.2]
  def change
    create_table :songs do |t|
      t.integer :artist_id, null: false
      t.string :title, null: false
      t.string :genre, null: false

      t.timestamps
    end
    add_index :songs, :artist_id
  end
end
