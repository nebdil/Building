class LikesController < ApplicationController

  def index
  end

  def create
    puts 'LIKES/CREATE CONTROLLER IN'
    currentUser = User.find_by(id: 3);
    @like = currentUser.likes.create!(
      post_id: params[:post_id]
    )
    puts currentUser
    puts @like
    render json: @like
    puts 'LIKES/CREATE CONTROLLER OUT'
  end

  def destroy
    puts 'LIKES/DESTROY CONTROLLER IN'
    @like = Like.find_by(id: params[:id])
    # @like = Like.where(:user_id => 3, :post_id => params[:post_id])
    @like.delete()
    puts 'LIKES/DESTROY CONTROLLER OUT'
  end

end
