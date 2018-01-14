puts "Seeding Data ..."

# Only run on development (local) instances not on production, etc.
unless Rails.env.development?
  puts "Development seeds only (for now)!"
  exit 0
end

# BUILDINGS
Reply.destroy_all
Like.destroy_all
Tag.destroy_all
Poststag.destroy_all
Post.destroy_all
User.destroy_all
Building.destroy_all


puts "destroyed all"

build1 = Building.create!({
  id: 1,
  address: '3601 Rue Sainte Famille, Montréal, QC H2X 2L6, Canada'
  })

# USERS

# User.destroy_all

puts "creating user"

user1 = build1.users.create!({
          id: 1,
          username: 'dilanimo',
          email: 'dilan@example.com',
          password: '123',
          password_confirmation: '123'
          })
user2 = build1.users.create!({
          id: 2,
          username: 'emmi',
          email: 'dilan1@example.com',
          password: '123',
          password_confirmation: '123'
          })
user3 = build1.users.create!({
          id: 3,
          username: 'juan',
          email: 'dilan2@example.com',
          password: '123',
          password_confirmation: '123'
          })
user4 = build1.users.create!({
          id: 4,
          username: 'ferdinand',
          email: 'dilan3@example.com',
          password: '123',
          password_confirmation: '123'
          })
user5 = build1.users.create!({
          id: 5,
          username: 'Building Manager',
          email: 'dilan4@example.com',
          password: '123',
          password_confirmation: '123'
          })

puts "created user"

# POSTS

# Post.destroy_all

# 5.times do |po|
#   Post.create!({
#     content: Faker::Hipster.sentence,
#     user_id: user1[:id]
#     })
# end
#
# users_id_arr = User.select("id").to_a.map{ |user| user.id}
#
# 20.times do |po|
#   Post.create!({
#     content: Faker::Hipster.sentence,
#     user_id: users_id_arr.sample
#     })
# end

# TAGS

# Tag.destroy_all

Tag.create!(name: 'gaming')
Tag.create!(name: 'education')
Tag.create!(name: 'management')


# tags_arr = ['gaming', 'management', 'education']
#
# tags_arr.each do |t|
#   Tag.create!({
#     name: t
#     })
# end

# POSTSTAGS

# Poststag.destroy_all

# tag_ids_arr = Tag.select("id").to_a.map{ |tag| tag.id}
#
# Post.all.each do |po|
#   po.poststags.create!({
#     tag_id: tag_ids_arr.sample
#     })
# end

# LIKES

# Like.destroy_all

# post_ids_arr = Post.select("id").to_a.map{ |post| post.id}
#
# User.all.each do |u|
#   u.likes.create!({
#     post_id: post_ids_arr.sample
#     })
# end

# REPLIES

# Reply.destroy_all

# User.all.each do |u|
#   u.replies.create!({
#     post_id: post_ids_arr.sample,
#     content: Faker::Hipster.sentence,
#     username: 'deneme'
#     })
# end
