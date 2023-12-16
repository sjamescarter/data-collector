class Goal < ApplicationRecord
  belongs_to :user
  belongs_to :student

  validates :condition, :behavior, :accuracy, :measurement, presence: true
  validates :accuracy, numericality: { in: 0..100 }
  validates :trials_correct, numericality: { allow_nil: true }
  validates :trials_total, comparison: { greater_than_or_equal_to: :trials_correct, allow_nil: true }
end
