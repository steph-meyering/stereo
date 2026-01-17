class PlaylistSong < ApplicationRecord
  validates :playlist_id, :song_id, presence: true
  validates :song_id, uniqueness: { scope: :playlist_id }

  belongs_to :playlist
  belongs_to :song
end
