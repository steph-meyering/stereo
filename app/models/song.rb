# == Schema Information
#
# Table name: songs
#
#  id         :bigint           not null, primary key
#  artist_id  :integer          not null
#  title      :string           not null
#  genre      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  waveform   :json
#
class Song < ApplicationRecord
    validates :artist_id, :title, :genre , presence: true
    validate :ensure_file
    validate :ensure_photo
    
    belongs_to :artist,
    foreign_key: :artist_id,
    class_name: 'User'
    
    has_one_attached :file
    has_one_attached :photo

    def ensure_file
        unless self.file.attached?
            errors[:audio] << "file must be present"
        end
    end

    def ensure_photo
        unless self.photo.attached?
            errors[:cover] << "art must be present"
        end
    end

    
end
