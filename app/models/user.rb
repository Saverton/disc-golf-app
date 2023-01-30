class User < ApplicationRecord
  has_secure_password

  validates_presence_of :username, :password_digest, :first_name, :last_name, :email, :zip_code
  validates :username, uniqueness: true, length: { minimum: 5 }
  validates :password, length: { minimum: 8 }
  validates :email, uniqueness: true, format:
    {
      with: /\A[a-zA-Z0-9]+([-._][a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.\w{2,}\z/,
      message: 'email must follow standard format, i.e. test@example.com'
    }
end
