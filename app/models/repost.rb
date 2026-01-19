class Repost < ApplicationRecord
  validates :user_id, :song_id, presence: true
  validates :song_id, uniqueness: { scope: :user_id }

  belongs_to :user
  belongs_to :song, counter_cache: true
end
