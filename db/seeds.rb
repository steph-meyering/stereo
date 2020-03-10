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
song1 = Song.create(
    artist_id: steph.id, 
    title:"Apashe - Work (feat. Young Buck)", 
    genre: "bass")

# open the corresponding audio file from S3
file1 = open("https://stereo-dev.s3-us-west-1.amazonaws.com/songs/Apashe+-+Work+(feat.+Young+Buck).mp3")

# attach the audio file to the Song instance
song1.file.attach(io: file1, filename: "file1")


photo1 = open("https://stereo-dev.s3-us-west-1.amazonaws.com/photos/apashe_cover.jpg")
song1.photo.attach(io: photo1, filename: "photo1")


# ================================

song2 = Song.create(
    artist_id: guest.id, 
    title:"dontcry - redbone", 
    genre: "lo-fi chill")

file2 = open("https://stereo-dev.s3-us-west-1.amazonaws.com/songs/dontcry+-+redbone.mp3")
song2.file.attach(io: file2, filename: "file2")

photo2 = open("https://stereo-dev.s3-us-west-1.amazonaws.com/photos/redbone.jpg")
song2.photo.attach(io: photo2, filename: "photo2")