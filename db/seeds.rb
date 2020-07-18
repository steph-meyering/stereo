# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# gem needed to process URI instead of filepaths
require 'open-uri'

User.destroy_all
Song.destroy_all

guest = User.create!(
    username: "Demo User",
    password: "password",
    email: "guest@email.com",
    location: "Somewhere in the ActiveStorage Blob",
    about: "I'm a guest!!!"
)

steph = User.create!(
    username: "Steph Meyering",
    password: "password",
    email: "stephane.meyering@gmail.com",
    location: "San Francisco",
    about: "I built this"
)

# create a Song instance
song1 = Song.new(
    artist_id: steph.id, 
    title:"Apashe - Work (feat. Young Buck)", 
    genre: "bass")

# open the corresponding audio file from S3
file1 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/music/Apashe+-+Work+(feat.+Young+Buck).mp3")

# attach the audio file to the Song instance
song1.file.attach(io: file1, filename: "file1")

photo1 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/apashe_cover.jpg")
song1.photo.attach(io: photo1, filename: "photo1")

# persist song to database

# removing this specific song from production seed data
# song1.save!

# ================================ 
song2 = Song.new(
    artist_id: guest.id, 
    title:"dontcry - redbone", 
    genre: "lo-fi chill")

file2 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/music/dontcry+-+redbone.mp3")
song2.file.attach(io: file2, filename: "file2")

photo2 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/dontcry+-+redbone.jpg")
song2.photo.attach(io: photo2, filename: "photo2")

song2.save!

# ================================
song3 = Song.new(
    artist_id: guest.id, 
    title:"B l o m s t - Chill Rain", 
    genre: "chillout")

file3 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/music/Blomst-ChillRain.mp3")
song3.file.attach(io: file3, filename: "file3")

photo3 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/blomst-chillrain.jpg")
song3.photo.attach(io: photo3, filename: "photo3")
song3.save!

# ================================
song4 = Song.new(
    artist_id: guest.id, 
    title:"Foster The People - Pumped Up Kicks", 
    genre: "indie pop")

file4 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/music/FosterThePeople-PumpedUpKicks.mp3")
song4.file.attach(io: file4, filename: "file4")

photo4 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/FosterThePeople-PumpedUpKicks.jpg")
song4.photo.attach(io: photo4, filename: "photo4")
song4.save!

# ================================
song5 = Song.new(
    artist_id: guest.id, 
    title:"Gramatik - East Coast", 
    genre: "electronica")

file5 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/music/Gramatik-EastCoast.mp3")
song5.file.attach(io: file5, filename: "file5")

photo5 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/Gramatik-EastCoast.jpg")
song5.photo.attach(io: photo5, filename: "photo5")
song5.save!

# ================================
song6 = Song.new(
    artist_id: guest.id, 
    title:"Kill The Noise ft Mija - Salvation", 
    genre: "bass")

file6 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/music/KillTheNoise-Salvation.mp3")
song6.file.attach(io: file6, filename: "file6")

photo6 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/KillTheNoise-Salvation.jpg")
song6.photo.attach(io: photo6, filename: "photo6")
song6.save!

# ================================
song7 = Song.new(
    artist_id: guest.id, 
    title:"Kupla - Feathers", 
    genre: "chill")

file7 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/music/kupla-feathers.mp3")
song7.file.attach(io: file7, filename: "file7")

photo7 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/kupla-feathers.jpg")
song7.photo.attach(io: photo7, filename: "photo7")
song7.save!

# ================================
song8 = Song.new(
    artist_id: guest.id, 
    title:"Letherette - CartoonHaunt", 
    genre: "experimental")

file8 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/music/Letherette-CartoonHaunt.mp3")
song8.file.attach(io: file8, filename: "file8")

photo8 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/Letherette-CartoonHaunt.jpg")
song8.photo.attach(io: photo8, filename: "photo8")
song8.save!

# ================================
song9 = Song.new(
    artist_id: guest.id, 
    title:"Saib - Piano bar", 
    genre: "lofi hip-hop")

file9 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/music/saib-pianobar.mp3")
song9.file.attach(io: file9, filename: "file9")

photo9 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/saib-pianobar.jpg")
song9.photo.attach(io: photo9, filename: "photo9")
song9.save!

# ================================
song10 = Song.new(
    artist_id: guest.id, 
    title:"tails - Misted", 
    genre: "chillout")

file10 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/music/tails-Misted.mp3")
song10.file.attach(io: file10, filename: "file10")

photo10 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/tails-Misted.jpg")
song10.photo.attach(io: photo10, filename: "photo10")
song10.save!

# ================================
song11 = Song.new(
    artist_id: guest.id, 
    title:"Wax Tailor - Que Sera", 
    genre: "electronica")

file11 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/music/WaxTailor-QueSera.mp3")
song11.file.attach(io: file11, filename: "file11")

photo11 = open("https://stereo-seeds.s3-us-west-1.amazonaws.com/album-art/WaxTailor-QueSera.jpg")
song11.photo.attach(io: photo11, filename: "photo11")
song11.save!

# # ======TEMPLATE==========================
# # ================================
# # song@ = Song.new(
# #     artist_id: guest.id, 
# #     title:"", 
# #     genre: "")

# # file@ = open("")
# # song.file.attach(io: file, filename: "file")

# # photo = open("")
# # song.photo.attach(io: photo, filename: "photo")
