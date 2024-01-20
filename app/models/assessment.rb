class Assessment < ApplicationRecord
  belongs_to :objective

  validates :correct, numericality: true
  validates :total, comparison: { greater_than_or_equal_to: :correct }
end
