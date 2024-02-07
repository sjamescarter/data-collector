class Objective < ApplicationRecord
  belongs_to :goal
  has_many :assessments, dependent: :destroy

  default_scope { order(created_at: :asc) }

  validates :description, presence: true
end
