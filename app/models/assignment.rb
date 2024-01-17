class Assignment < ApplicationRecord
  belongs_to :goal

  validates :correct, numericality: true
  validates :total, comparison: { greater_than_or_equal_to: :correct }
end
