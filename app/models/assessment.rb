class Assessment < ApplicationRecord
  belongs_to :objective
  
  default_scope { order(created_at: :desc) }

  validates :correct, numericality: true
  validates :total, comparison: { greater_than_or_equal_to: :correct }
end
