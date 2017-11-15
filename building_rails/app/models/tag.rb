class Tag < ApplicationRecord
  has_many :poststags, dependent: :delete_all
  has_many :posts, through: :poststags, dependent: :delete_all
end
