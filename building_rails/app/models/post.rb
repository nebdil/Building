class Post < ApplicationRecord
  belongs_to :user
  has_many :likes
  has_many :replies
  has_many :poststags
  has_many :tags, through: :poststags
end
