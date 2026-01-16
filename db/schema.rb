# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2025_10_29_033602) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.string "service_name"
    t.index ["key"], name: "active_storage_blobs_key_key", unique: true
    t.index ["key"], name: "index_active_storage_blobs_on_key"
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "song_id", null: false
    t.bigint "user_id", null: false
    t.text "body", null: false
    t.integer "song_time", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["song_id"], name: "index_comments_on_song_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "songs", force: :cascade do |t|
    t.integer "artist_id", null: false
    t.string "title", null: false
    t.string "genre", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.json "waveform"
    t.index ["artist_id"], name: "index_songs_on_artist_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "location"
    t.boolean "admin", default: false
    t.text "about"
    t.string "password_digest", null: false
    t.string "session_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_token"], name: "index_users_on_session_token"
    t.index ["session_token"], name: "users_session_token_key", unique: true
    t.index ["username"], name: "index_users_on_username"
    t.index ["username"], name: "users_username_key", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id", name: "active_storage_attachments_blob_id_fkey"
  add_foreign_key "comments", "songs", name: "comments_song_id_fkey"
  add_foreign_key "comments", "users", name: "comments_user_id_fkey"
end
