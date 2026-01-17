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

# Only seed if database is empty (first deploy) unless explicitly reset
if User.exists? || Song.exists?
  puts "Skipping seeds: data already exists. Set RESET_SEEDS=true to re-seed."
  exit
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

  unless song.file.attached?
    file = URI.open(audio_url)
    song.file.attach(io: file, filename: File.basename(URI.parse(audio_url).path))
  end

  unless song.photo.attached?
    photo = URI.open(photo_url)
    song.photo.attach(io: photo, filename: File.basename(URI.parse(photo_url).path))
  end

  song.save!
  song
end

def comment_body_for(song)
  phrases = [
    "On repeat.",
    "This groove is perfect.",
    "Love the mix and the vibe.",
    "Instant favorite.",
    "That drop is clean.",
    "So smooth.",
    "This is a mood.",
    "Great production on this one.",
    "Can't stop listening.",
    "Beautiful texture throughout."
  ]
  phrases.sample
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

extra_users = [
  { username: "Ava Stone", email: "ava.stone@example.com", location: "Oakland", about: "Vinyl collector." },
  { username: "Liam Park", email: "liam.park@example.com", location: "Seattle", about: "Chill beats all day." },
  { username: "Noah Brooks", email: "noah.brooks@example.com", location: "Austin", about: "Bedroom producer." },
  { username: "Mia Carter", email: "mia.carter@example.com", location: "Portland", about: "Late-night listener." },
  { username: "Ethan Reed", email: "ethan.reed@example.com", location: "Denver", about: "Crate digger." },
  { username: "Zoey Quinn", email: "zoey.quinn@example.com", location: "Los Angeles", about: "Ambient and lo-fi." },
  { username: "Lucas Hall", email: "lucas.hall@example.com", location: "Chicago", about: "Sampler enthusiast." },
  { username: "Sofia Price", email: "sofia.price@example.com", location: "Brooklyn", about: "Always chasing new sounds." },
  { username: "Mason Bell", email: "mason.bell@example.com", location: "Phoenix", about: "Headphones on." },
  { username: "Harper Lane", email: "harper.lane@example.com", location: "San Diego", about: "Melodic vibes." }
].map do |attrs|
  ensure_user(
    username: attrs[:username],
    password: "password",
    email: attrs[:email],
    location: attrs[:location],
    about: attrs[:about]
  )
end

users_for_follows = [guest, steph] + extra_users
users_for_follows.each do |user|
  candidates = users_for_follows.reject { |u| u.id == user.id }
  candidates.sample(rand(2..5)).each do |followed|
    Follow.find_or_create_by!(follower_id: user.id, followed_id: followed.id)
  end
end

songs = []

# Optional: include this track only when explicitly requested
if ENV["INCLUDE_SONG1"] == "true"
  songs << ensure_song(
    artist: steph,
    title: "Apashe - Work (feat. Young Buck)",
    genre: "bass",
    audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/Apashe+-+Work+(feat.+Young+Buck).mp3",
    photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/apashe_cover.jpg"
  )
end

songs << ensure_song(
  artist: guest,
  title: "dontcry - redbone",
  genre: "lo-fi chill",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/dontcry+-+redbone.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/dontcry+-+redbone.jpg"
)

songs << ensure_song(
  artist: steph,
  title: "B l o m s t - Chill Rain",
  genre: "chillout",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/Blomst-ChillRain.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/blomst-chillrain.jpg"
)

songs << ensure_song(
  artist: steph,
  title: "Foster The People - Pumped Up Kicks",
  genre: "indie pop",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/FosterThePeople-PumpedUpKicks.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/FosterThePeople-PumpedUpKicks.jpg"
)

songs << ensure_song(
  artist: steph,
  title: "Gramatik - East Coast",
  genre: "electronica",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/Gramatik-EastCoast.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/Gramatik-EastCoast.jpg"
)

songs << ensure_song(
  artist: steph,
  title: "Kill The Noise ft Mija - Salvation",
  genre: "bass",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/KillTheNoise-Salvation.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/KillTheNoise-Salvation.jpg"
)

songs << ensure_song(
  artist: steph,
  title: "Kupla - Feathers",
  genre: "chill",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/kupla-feathers.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/kupla-feathers.jpg"
)

songs << ensure_song(
  artist: steph,
  title: "Letherette - CartoonHaunt",
  genre: "experimental",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/Letherette-CartoonHaunt.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/Letherette-CartoonHaunt.jpg"
)

songs << ensure_song(
  artist: steph,
  title: "Saib - Piano bar",
  genre: "lofi hip-hop",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/saib-pianobar.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/saib-pianobar.jpg"
)

songs << ensure_song(
  artist: steph,
  title: "tails - Misted",
  genre: "chillout",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/tails-Misted.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/tails-Misted.jpg"
)

songs << ensure_song(
  artist: steph,
  title: "Wax Tailor - Que Sera",
  genre: "electronica",
  audio_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/music/WaxTailor-QueSera.mp3",
  photo_url: "https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/WaxTailor-QueSera.jpg"
)

commenters = [guest, steph] + extra_users
songs.each do |song|
  rand(2..8).times do
    Comment.create!(
      song_id: song.id,
      user_id: commenters.sample.id,
      body: comment_body_for(song),
      song_time: rand(0..120)
    )
  end
end

likers = commenters
songs.each do |song|
  likers.sample(rand(1..6)).each do |user|
    Like.find_or_create_by!(song_id: song.id, user_id: user.id)
  end
end

reposters = commenters
songs.each do |song|
  reposters.sample(rand(0..4)).each do |user|
    Repost.find_or_create_by!(song_id: song.id, user_id: user.id)
  end
end

playlists = [
  { user: guest, title: "Late Night Lo-Fi", private: false },
  { user: guest, title: "Coding Flow", private: false },
  { user: steph, title: "Studio Drafts", private: true },
  { user: steph, title: "Stereo Picks", private: false }
] + extra_users.sample(2).map do |user|
  { user: user, title: "#{user.username.split.first}'s Mix", private: false }
end

playlists.each do |attrs|
  playlist = Playlist.find_or_create_by!(user_id: attrs[:user].id, title: attrs[:title]) do |p|
    p.private = attrs[:private]
  end
  songs.sample(rand(3..6)).each_with_index do |song, idx|
    PlaylistSong.find_or_create_by!(playlist_id: playlist.id, song_id: song.id) do |ps|
      ps.position = idx + 1
    end
  end
end
