class LikesController < ApplicationController
  before_action :authenticate_user

  def create
    puts 'LIKES/CREATE CONTROLLER IN'
    @like = current_user.likes.create!(
      post_id: params[:post_id]
    )
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
    puts 'LIKES/CREATE CONTROLLER OUT'
  end

  def destroy
    puts 'LIKES/DESTROY CONTROLLER IN'
    puts params[:id]
    Like.destroy(params[:id])
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
    puts 'LIKES/DESTROY CONTROLLER OUT'
  end
end
