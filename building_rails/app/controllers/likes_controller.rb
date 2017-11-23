class LikesController < ApplicationController
  before_action :authenticate_user

  def index
  end

  def create
    puts 'LIKES/CREATE CONTROLLER IN'
    user = User.find_by(id: [session[:user_id]])
    puts session.inspect
    puts user.inspect

    like = Like.where(post_id: params[:post_id], user_id: session[:user_id])

    if like
      like.delete()
    else
      @like = user.likes.create!(
        post_id: params[:post_id]
      )
      puts @like
      render json: @like
    end
    puts 'LIKES/CREATE CONTROLLER OUT'
  end

  def destroy
    puts 'LIKES/DESTROY CONTROLLER IN'
    @like = Like.find_by(id: params[:id])
    # @like = Like.where(:user_id => session[:user_id], :post_id => params[:post_id])
    @like.delete()
    puts 'LIKES/DESTROY CONTROLLER OUT'
  end

end
