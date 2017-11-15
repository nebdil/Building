class Tag < ApplicationRecord
  has_many :poststags
  has_many :posts, through: :poststags
end
