class User < ApplicationRecord
  belongs_to :building
  has_many :posts, dependent: :delete_all
  has_many :likes, dependent: :delete_all
  has_many :replies, dependent: :delete_all
end
