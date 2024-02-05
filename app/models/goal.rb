class Goal < ApplicationRecord
  belongs_to :user
  belongs_to :student
  has_many :objectives, dependent: :destroy
  has_many :assessments, through: :objectives
  
  default_scope { order(subject: :asc) }

  validates :accuracy, :behavior, :condition, :measurement, :subject, presence: true
  validates :accuracy, numericality: { in: 0..100 }
end
