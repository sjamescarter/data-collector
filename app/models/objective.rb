class Objective < ApplicationRecord
  belongs_to :goal
  has_many :assessments, dependent: :destroy

  validates :description, presence: true
end
