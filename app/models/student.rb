class Student < ApplicationRecord
  has_many :goals
  has_many :users, through: :goals
  
  default_scope { order(last_name: :asc) }

  validates :first_name, :last_name, presence: true
  validates :grade_level, numericality: { in: 1..12 }
end
