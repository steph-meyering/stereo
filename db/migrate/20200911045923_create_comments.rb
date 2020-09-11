class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.references :song, foreign_key: true, null: false
      t.references :user, foreign_key: true, null: false
      t.text :body, null: false
      t.integer :song_time, null: false

      t.timestamps
    end
  end
end
