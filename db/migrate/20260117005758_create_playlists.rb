class CreatePlaylists < ActiveRecord::Migration[7.1]
  def change
    create_table :playlists do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title, null: false
      t.boolean :private, null: false, default: false

      t.timestamps
    end
  end
end
