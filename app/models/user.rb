class User < ApplicationRecord
  has_secure_password
  has_many :goals, dependent: :destroy
  has_many :students, through: :goals
  has_many :objectives, through: :goals
  has_many :assessments, through: :objectives

  validates :first_name, :last_name, :job_title, :email, :password_confirmation, presence: true
  validates :email, format: { with: /\A[A-Za-z0-9+_.-]+@([A-Za-z0-9]+\.)+[A-Za-z]{2,6}\z/}, uniqueness: { case_sensitive: false }, length: { minimum: 4, maximum: 254 } 
  validates :password, length: { minimum: 8 }
end
