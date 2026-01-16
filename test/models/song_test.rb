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
require 'test_helper'

class SongTest < ActiveSupport::TestCase
  include ActionDispatch::TestProcess

  setup do
    @user = User.new(username: "artist", email: "artist@example.com")
    @user.password = "password"
    @user.save!
  end

  test "valid song with attachments" do
    song = build_song
    assert song.valid?
  end

  test "invalid without audio file" do
    song = build_song(attach_file: false)
    refute song.valid?
    assert_includes song.errors[:audio], "file must be present"
  end

  test "invalid with unsupported audio type" do
    song = build_song(attach_file: false)
    song.file.attach(
      io: StringIO.new("not audio"),
      filename: "file.txt",
      content_type: "text/plain"
    )
    refute song.valid?
    assert_includes song.errors[:audio], "must be an audio file (MP3, WAV, OGG, FLAC)"
  end

  test "invalid with oversized audio file" do
    song = build_song
    song.file.blob.define_singleton_method(:byte_size) { Song::MAX_AUDIO_SIZE + 1 }
    refute song.valid?
    assert_includes song.errors[:audio], "file size must be less than #{Song::MAX_AUDIO_SIZE / 1.megabyte}MB"
  end

  test "invalid with unsupported image type" do
    song = build_song(attach_photo: false)
    song.photo.attach(
      io: StringIO.new("not image"),
      filename: "cover.txt",
      content_type: "text/plain"
    )
    refute song.valid?
    assert_includes song.errors[:cover], "art must be an image file (JPEG, PNG, GIF, WebP)"
  end

  test "invalid with oversized image" do
    song = build_song
    song.photo.blob.define_singleton_method(:byte_size) { Song::MAX_IMAGE_SIZE + 1 }
    refute song.valid?
    assert_includes song.errors[:cover], "art size must be less than #{Song::MAX_IMAGE_SIZE / 1.megabyte}MB"
  end

  private

  def build_song(attach_file: true, attach_photo: true)
    song = Song.new(artist_id: @user.id, title: "Test Song", genre: "test")
    if attach_file
      song.file.attach(
        io: File.open(Rails.root.join("test/fixtures/files/sample.mp3")),
        filename: "sample.mp3",
        content_type: "audio/mpeg"
      )
    end
    if attach_photo
      song.photo.attach(
        io: File.open(Rails.root.join("test/fixtures/files/cover.jpg")),
        filename: "cover.jpg",
        content_type: "image/jpeg"
      )
    end
    song
  end
end
