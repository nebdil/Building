class RepliesController < ApplicationController
  def index
  end
  def create
    puts 'POSTS CONTROLLER IN'
    post = Post.find_by(id: params[:post_id])
    @reply = post.replies.create!(
      content: params[:post_content],
      user_id: 1
    )
    puts params
    render json: @reply
    puts 'POSTS CONTROLLER OUT'
  end
  def new
  end
  def destroy
  end
end
