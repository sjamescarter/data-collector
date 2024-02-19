class Organization < ApplicationRecord
  has_many :users
  has_many :students

  validates :name, :code, presence: :true

  def assign_code
    self.code = (('a'..'z').to_a + (0..9).to_a).to_a.sample(4).join
  end
end
