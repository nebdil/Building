class LikesController < ApplicationController
  before_action :authenticate_user

  def index
  end

  def create
    puts 'LIKES/CREATE/DESTROY CONTROLLER IN'
    @user = User.find_by_email(params[:email])
    # puts '@user.inspect'
    # puts @user.inspect
    #
    # puts 'params[:post_id]'
    # puts params[:post_id]
    # puts '@user[:id]'
    # puts @user[:id]
    puts 'CURRENT USER'
    puts current_user.username

    like = Like.where(post_id: params[:post_id]).where(user_id: @user[:id]).first
    # puts like

    if like
      puts 'IN IF'
      like.destroy
    else
      puts 'IN ELSE'
      @like = @user.likes.create!(
        post_id: params[:post_id]
      )
    end

    @posts = Post.joins(:user).includes(:user).where(users: {building_id: params[:building_id]}).order('posts.id DESC')
    post_arr = @posts.map do |po|
      result = po.attributes
      result[:username] = po.user.username
      result[:reply] = po.replies
      result[:like] = po.likes
      result[:tags] = po.tags
      result[:building] = params[:building_id]
      result
    end
    render json: post_arr
    puts 'LIKES/CREATE/DESTROY CONTROLLER OUT'
  end
end
