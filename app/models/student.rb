class Student < ApplicationRecord
  validates :first_name, :last_name, presence: true
  validates :grade_level, numericality: { in: 1..12 }
end
