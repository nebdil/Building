class RepliesController < ApplicationController
  before_action :authenticate_user

  def index
  end
  def create
    puts 'REPLIES CONTROLLER IN'

    post = Post.find_by(id: params[:post_id])

    @reply = post.replies.create!(
      content: params[:reply],
      user_id: current_user.id,
      username: current_user.username
    )

    @posts = Post.joins(:user).includes(:user).where(users: {building_id: params[:building_id]}).order('posts.id DESC')
    post_arr = @posts.map do |po|
      result = po.attributes
      result[:username] = po.user.username
      result[:reply] = po.replies
      result[:like] = po.likes
      result[:tags] = po.tags
      result[:building] = params[:building_id].to_i
      result
    end

    render json: post_arr
    
    puts 'REPLIES CONTROLLER OUT'
  end
  def new
  end
  def destroy
  end
end
