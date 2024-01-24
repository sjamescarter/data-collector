class Goal < ApplicationRecord
  belongs_to :user
  belongs_to :student
  has_many :objectives, dependent: :destroy
  has_many :assessments, through: :objectives

  validates :condition, :behavior, :accuracy, :measurement, presence: true
  validates :accuracy, numericality: { in: 0..100 }
end
