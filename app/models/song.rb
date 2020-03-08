class Song < ApplicationRecord
    validates :artist_id, :title, :genre , presence: true
    
    has_one_attached :file
    has_one_attached :photo
    
end
