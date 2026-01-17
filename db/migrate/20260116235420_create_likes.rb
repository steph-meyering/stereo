class CreateLikes < ActiveRecord::Migration[7.1]
  def change
    create_table :likes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :song, null: false, foreign_key: true

      t.timestamps
    end
    add_index :likes, [:user_id, :song_id], unique: true
  end
end
