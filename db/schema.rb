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

ActiveRecord::Schema.define(version: 2021_10_23_191618) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "days", force: :cascade do |t|
    t.date "day"
    t.datetime "wokeup_at"
    t.datetime "turned_off_at"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_days_on_user_id"
  end

  create_table "dodoables", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.jsonb "executor", default: {}
    t.jsonb "trigger", default: {}
    t.jsonb "fields", default: {}
    t.integer "nature", default: 0
    t.bigint "last_dodone_day_id"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "about_time", default: 0
    t.index ["last_dodone_day_id"], name: "index_dodoables_on_last_dodone_day_id"
    t.index ["user_id"], name: "index_dodoables_on_user_id"
  end

  create_table "dodones", force: :cascade do |t|
    t.bigint "dodoable_id", null: false
    t.bigint "day_id", null: false
    t.datetime "started_at"
    t.datetime "finished_at"
    t.jsonb "fields", default: {}
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "scheduled_to"
    t.index ["day_id"], name: "index_dodones_on_day_id"
    t.index ["dodoable_id"], name: "index_dodones_on_dodoable_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "timezone", default: "UTC"
  end

  add_foreign_key "days", "users"
  add_foreign_key "dodoables", "days", column: "last_dodone_day_id"
  add_foreign_key "dodoables", "users"
  add_foreign_key "dodones", "days"
  add_foreign_key "dodones", "dodoables"
end
