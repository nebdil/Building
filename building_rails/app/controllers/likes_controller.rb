class LikesController < ApplicationController
  before_action :authenticate_user

  def index
  end

  def create
    puts 'LIKES/CREATE CONTROLLER IN'
    @user = User.find_by_email(params[:email])
    puts '@user.inspect'
    puts @user.inspect

    puts 'params[:post_id]'
    puts params[:post_id]
    puts '@user[:id]'
    puts @user[:id]

    like = Like.find_by(post_id: params[:post_id])
    if like
      puts 'in if'
      if like[:user_id] == @user[:id]
        puts 'in if if'
        like.destroy
        user_like = {user: @user}
        render json: user_like
      end
    else
      puts 'in else'
      @like = @user.likes.create!(
        post_id: params[:post_id]
      )
      puts '@like'
      puts @like.inspect
      user_like = {user: @user, like: @like}
      puts 'user_like'
      puts user_like
      render json: user_like
    end

    puts 'LIKES/CREATE CONTROLLER OUT'
  end

  # def destroy
  #   puts params[:likes]
  #   puts params
  #   puts 'LIKES/DESTROY CONTROLLER IN'
  #   @like = Like.find_by(id: params[:likeId])
  #   @like.delete()
  #   puts 'LIKES/DESTROY CONTROLLER OUT'
  # end

end
