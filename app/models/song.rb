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
    validate :validate_file_type
    validate :validate_file_size
    validate :validate_photo_type
    validate :validate_photo_size
    
    belongs_to :artist,
    foreign_key: :artist_id,
    class_name: 'User'
    
    has_many :comments,
    dependent: :delete_all,
    foreign_key: :song_id,
    class_name: 'Comment'

    has_many :likes,
    dependent: :delete_all,
    foreign_key: :song_id,
    class_name: 'Like'

    has_many :reposts,
    dependent: :delete_all,
    foreign_key: :song_id,
    class_name: 'Repost'
    
    has_one_attached :file
    has_one_attached :photo
    
    # Maximum file sizes
    MAX_AUDIO_SIZE = 50.megabytes
    MAX_IMAGE_SIZE = 5.megabytes
    
    # Allowed content types
    AUDIO_TYPES = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/flac']
    IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']

    def ensure_file
        unless self.file.attached?
            errors.add(:audio, "file must be present")
        end
    end

    def ensure_photo
        unless self.photo.attached?
            errors.add(:cover, "art must be present")
        end
    end

    def validate_file_type
        return unless file.attached?
        unless AUDIO_TYPES.include?(file.content_type)
            errors.add(:audio, "must be an audio file (MP3, WAV, OGG, FLAC)")
        end
    end

    def validate_file_size
        return unless file.attached?
        if file.byte_size > MAX_AUDIO_SIZE
            errors.add(:audio, "file size must be less than #{MAX_AUDIO_SIZE / 1.megabyte}MB")
        end
    end

    def validate_photo_type
        return unless photo.attached?
        unless IMAGE_TYPES.include?(photo.content_type)
            errors.add(:cover, "art must be an image file (JPEG, PNG, GIF, WebP)")
        end
    end

    def validate_photo_size
        return unless photo.attached?
        if photo.byte_size > MAX_IMAGE_SIZE
            errors.add(:cover, "art size must be less than #{MAX_IMAGE_SIZE / 1.megabyte}MB")
        end
    end
end
