class PostsController < ApplicationController
  def create
    puts 'POSTS CONTROLLER IN'
    user = User.find_by(id: 1)
    @post = user.posts.create!(
      content: params[:post_content]
    )
    @tag = Tag.find_or_create_by! name: params[:tag_name]
    @poststag = @post.poststags.create!(post_id: @post[:id], tag_id: @tag[:id])
    puts params
    render json: @post
    puts 'POSTS CONTROLLER OUT'
  end
  def show
  end
  def update
  end
  def destroy
  end
end
