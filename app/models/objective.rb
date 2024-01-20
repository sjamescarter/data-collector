class Objective < ApplicationRecord
  belongs_to :goal
  has_many :assessments

  validates :description, presence: true
end
