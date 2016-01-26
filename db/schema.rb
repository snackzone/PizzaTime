# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160126151200) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "restaurants", force: :cascade do |t|
    t.string   "name",        null: false
    t.string   "address",     null: false
    t.float    "lat",         null: false
    t.float    "lng",         null: false
    t.integer  "price_range", null: false
    t.string   "url"
    t.string   "photo_url"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "restaurants", ["address"], name: "index_restaurants_on_address", using: :btree
  add_index "restaurants", ["lat"], name: "index_restaurants_on_lat", using: :btree
  add_index "restaurants", ["lng"], name: "index_restaurants_on_lng", using: :btree
  add_index "restaurants", ["name"], name: "index_restaurants_on_name", using: :btree

end
