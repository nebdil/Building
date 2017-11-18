class PostsController < ApplicationController
  def create
    puts 'POSTS CONTROLLER IN'
    user = User.find_by(id: 13)
    @post = user.posts.create!(
      content: params[:content]
    )
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
