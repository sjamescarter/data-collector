class Student < ApplicationRecord
  validates :first_name, :last_name, presence: true
  validates :grade_level, numericality: {minimum: -1, maximum: 12}
end
