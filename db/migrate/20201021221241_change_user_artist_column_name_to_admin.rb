class ChangeUserArtistColumnNameToAdmin < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :artist, :boolean, :default => false
    rename_column :users, :artist, :admin
  end
end
