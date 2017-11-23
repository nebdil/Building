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
      end
    else
      puts 'in else'
      @like = @user.likes.create!(
        post_id: params[:post_id]
      )
      puts '@like'
      puts @like.inspect
      render json: @like
    end

    puts 'LIKES/CREATE CONTROLLER OUT'
  end

  # def destroy
  #   puts 'LIKES/DESTROY CONTROLLER IN'
  #   puts 'params'
  #   puts params
  #   puts 'like.inspect'
  #   puts like.inspect
  #   # @like = Like.find_by(id: params[:id])
  #   # puts '@like.inspect'
  #   # puts @like.inspect
  #   # @like = Like.where(:user_id => session[:user_id], :post_id => params[:post_id])
  #   @like.delete()
  #   puts 'LIKES/DESTROY CONTROLLER OUT'
  # end

end
