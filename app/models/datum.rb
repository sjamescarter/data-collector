class Datum < ApplicationRecord
  belongs_to :goals

  validates :correct, numericality: true
  validates :total, comparison: { greater_than_or_equal_to: :correct }
end
