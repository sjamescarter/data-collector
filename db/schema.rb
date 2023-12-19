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

ActiveRecord::Schema[7.0].define(version: 2023_12_19_202525) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "data", force: :cascade do |t|
    t.string "note"
    t.string "correct"
    t.string "total"
    t.bigint "goals_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["goals_id"], name: "index_data_on_goals_id"
  end

  create_table "goals", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "student_id", null: false
    t.string "condition"
    t.string "behavior"
    t.integer "accuracy"
    t.string "measurement"
    t.integer "trials_correct"
    t.integer "trials_total"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["student_id"], name: "index_goals_on_student_id"
    t.index ["user_id"], name: "index_goals_on_user_id"
  end

  create_table "students", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.integer "grade_level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
    t.string "job_title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "data", "goals", column: "goals_id"
  add_foreign_key "goals", "students"
  add_foreign_key "goals", "users"
end
