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
    username: "guest",
    password: "password",
    email: "guest@email.com",
    location: "San Francisco",
    about: "I'm a guest!!!"
)

s1 = Song.create(
    artist_id:1, 
    title:"Apashe - Work (feat. Young Buck)", 
    genre: "bass")

f1 = open("https://stereo-dev.s3-us-west-1.amazonaws.com/Apashe+-+Work+(feat.+Young+Buck).mp3")

s1.file.attach(io: f1, filename: "s1")