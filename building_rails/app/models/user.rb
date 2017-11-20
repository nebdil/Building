class User < ApplicationRecord
  has_secure_password
  
  belongs_to :building
  has_many :posts, dependent: :delete_all
  has_many :likes, dependent: :delete_all
  has_many :replies, dependent: :delete_all

  def self.authenticate_with_credentials(email, password)
  user = User.find_by_email(email.downcase.lstrip.rstrip)
  if user && user.authenticate(password)
    user
  else
    nil
  end
end
end
