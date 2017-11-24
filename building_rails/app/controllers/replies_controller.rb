class RepliesController < ApplicationController
  before_action :authenticate_user

  def index
  end
  def create
    puts 'POSTS CONTROLLER IN'
    puts params
    post = Post.find_by(id: params[:post_id])
    user = User.find_by(email: params[:user_email])
    @reply = post.replies.create!(
      content: params[:reply],
      user_id: user[:id],
      username: user[:username]
    )
    reply = {
      reply: @reply,
      user: user[:username]
    }
    render json: reply
    puts 'POSTS CONTROLLER OUT'
  end
  def new
  end
  def destroy
  end
end
