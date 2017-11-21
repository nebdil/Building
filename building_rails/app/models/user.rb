class User < ApplicationRecord
  has_secure_password

  belongs_to :building
  has_many :posts, dependent: :delete_all
  has_many :likes, dependent: :delete_all
  has_many :replies, dependent: :delete_all

  validates_uniqueness_of :email, case_sensitive: false
  validates :email, presence: true
  validates :name, presence: true
  validates :password, presence: true
  validates :password_confirmation, presence: true

  def self.authenticate_with_credentials(email, password)
  user = User.find_by_email(email.downcase.lstrip.rstrip)
  if user && user.authenticate(password)
    user
  else
    nil
  end
end
end
