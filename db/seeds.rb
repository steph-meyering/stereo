# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

# gem needed to process URI instead of filepaths
require "open-uri"

# Optional reset (useful for local dev only)
if ENV["RESET_SEEDS"] == "true"
  Comment.destroy_all
  Song.destroy_all
  User.destroy_all
end

def ensure_user(attrs)
  user = User.find_or_initialize_by(username: attrs[:username])
  user.email = attrs[:email]
  user.location = attrs[:location]
  user.about = attrs[:about]
  user.admin = attrs[:admin] || false
  user.password = attrs[:password] if user.new_record?
  user.save!
  user
end

def ensure_song(artist:, title:, genre:, audio_url:, photo_url:)
  song = Song.find_or_initialize_by(artist_id: artist.id, title: title)
  song.genre = genre
  song.save!

  unless song.file.attached?
    file = URI.open(audio_url)
    song.file.attach(io: file, filename: File.basename(URI.parse(audio_url).path))
  end

  unless song.photo.attached?
    photo = URI.open(photo_url)
    song.photo.attach(io: photo, filename: File.basename(URI.parse(photo_url).path))
  end

  song
end

guest = ensure_user(
  username: "Demo User",
  password: "password",
  email: "guest@email.com",
  location: "Somewhere in the ActiveStorage Blob",
  about: "I'm a demo user, my profile is here to show you what a user profile looks like for testing purposes. Though I am saving you the time and trouble of making your own account, you're more than welcome to create your own! :)"
)

steph = ensure_user(
  username: "Steph Meyering",
  password: "password",
  email: "stephane.meyering@gmail.com",
  location: "San Francisco",
  about: "I built this",
  admin: true
)

# Optional: include this track only when explicitly requested
if ENV["INCLUDE_SONG1"] == "true"
  ensure_song(
    artist: steph,
    title: "Apashe - Work (feat. Young Buck)",
    genre: "bass",
    audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/Apashe+-+Work+(feat.+Young+Buck).mp3",
    photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/apashe_cover.jpg"
  )
end

ensure_song(
  artist: guest,
  title: "dontcry - redbone",
  genre: "lo-fi chill",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/dontcry+-+redbone.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/dontcry+-+redbone.jpg"
)

ensure_song(
  artist: steph,
  title: "B l o m s t - Chill Rain",
  genre: "chillout",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/Blomst-ChillRain.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/blomst-chillrain.jpg"
)

ensure_song(
  artist: steph,
  title: "Foster The People - Pumped Up Kicks",
  genre: "indie pop",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/FosterThePeople-PumpedUpKicks.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/FosterThePeople-PumpedUpKicks.jpg"
)

ensure_song(
  artist: steph,
  title: "Gramatik - East Coast",
  genre: "electronica",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/Gramatik-EastCoast.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/Gramatik-EastCoast.jpg"
)

ensure_song(
  artist: steph,
  title: "Kill The Noise ft Mija - Salvation",
  genre: "bass",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/KillTheNoise-Salvation.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/KillTheNoise-Salvation.jpg"
)

ensure_song(
  artist: steph,
  title: "Kupla - Feathers",
  genre: "chill",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/kupla-feathers.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/kupla-feathers.jpg"
)

ensure_song(
  artist: steph,
  title: "Letherette - CartoonHaunt",
  genre: "experimental",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/Letherette-CartoonHaunt.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/Letherette-CartoonHaunt.jpg"
)

ensure_song(
  artist: steph,
  title: "Saib - Piano bar",
  genre: "lofi hip-hop",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/saib-pianobar.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/saib-pianobar.jpg"
)

ensure_song(
  artist: steph,
  title: "tails - Misted",
  genre: "chillout",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/tails-Misted.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/tails-Misted.jpg"
)

ensure_song(
  artist: steph,
  title: "Wax Tailor - Que Sera",
  genre: "electronica",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/WaxTailor-QueSera.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/WaxTailor-QueSera.jpg"
)
