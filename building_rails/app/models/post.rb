class Post < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :delete_all
  has_many :replies, dependent: :delete_all
  has_many :poststags, dependent: :delete_all
  has_many :tags, through: :poststags, dependent: :delete_all
end
