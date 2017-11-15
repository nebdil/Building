puts "Seeding Data ..."

# Only run on development (local) instances not on production, etc.
unless Rails.env.development?
  puts "Development seeds only (for now)!"
  exit 0
end

# BUILDINGS

Building.destroy_all

build1 = Building.create!({
  street_no: Faker::Address.building_number,
  street_name: Faker::Address.street_name,
  city: Faker::Address.city,
  province: Faker::Address.state,
  country: Faker::Address.country,
  postal_code: Faker::Address.zip_code
  })

# USERS

User.destroy_all

10.times do
  build1.users.create!({
    username: Faker::Internet.user_name,
    email: Faker::Internet.email,
    password: Faker::Internet.password
    })
end

# POSTS

Post.destroy_all

users_id_arr = User.select("id").to_a.map{ |user| user.id}

20.times do |po|
  Post.create!({
    content: Faker::Hipster.sentence,
    user_id: users_id_arr.sample
    })
end

# TAGS

Tag.destroy_all

tags_arr = ['gaming', 'petsitting', 'chores', 'food', 'education']

tags_arr.each do |t|
  Tag.create!({
    name: t
    })
end

# POSTSTAGS

Poststag.destroy_all

tag_ids_arr = Tag.select("id").to_a.map{ |tag| tag.id}

Post.all.each do |po|
  po.poststags.create!({
    tag_id: tag_ids_arr.sample
    })
end

# LIKES

Like.destroy_all

post_ids_arr = Post.select("id").to_a.map{ |post| post.id}

User.all.each do |u|
  u.likes.create!({
    post_id: post_ids_arr.sample
    })
end

# REPLIES

Reply.destroy_all

User.all.each do |u|
  u.replies.create!({
    post_id: post_ids_arr.sample,
    content: Faker::Hipster.sentence
    })
end
