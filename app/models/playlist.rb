class Playlist < ApplicationRecord
  validates :title, :user_id, presence: true
  validates :title, length: { maximum: 100 }

  belongs_to :user
  has_many :playlist_songs, dependent: :delete_all
  has_many :songs, through: :playlist_songs
end
