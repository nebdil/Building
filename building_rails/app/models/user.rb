class User < ApplicationRecord
  belongs_to :building
  has_many :posts
  has_many :likes
  has_many :replies
end
