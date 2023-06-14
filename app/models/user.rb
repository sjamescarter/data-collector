class User < ApplicationRecord
  has_secure_password

  validates :email, :password, :password_confirmation, :first_name, :last_name, :job_title, presence: true
  validates :email, format: { with: /^[A-Za-z0-9+_.-]+@([A-Za-z0-9]+\.)+[A-Za-z]{2,6}$/}, uniqueness: { case_sensitive: false }, length: { minimum: 4, maximum: 254 } 
  validates :password, length: { minimum: 8 }
end
