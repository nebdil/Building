class UsersController < ApplicationController
  require 'pp'
  def index
  end
  def create
  end
  def new
  end
  def edit
  end
  def show
    @building = Building.find_by(id: params[:building_id])
    @user = @building.users.find_by(id: params[:id])
    @posts = @user.posts.all.order('posts.id DESC')
    post_arr = @posts.map do |po|
      result = po.attributes
      result[:username] = po.user.username
      result[:reply] = po.replies
      result[:like] = po.likes
      result[:tags] = po.tags
      result
    end
    @posts_user_replied_to = @user.posts.all.joins(:replies).includes(:replies).where(replies: {user_id: params[:id]}).order('posts.id DESC')
    reply_arr = @posts_user_replied_to.map do |pos|
      result = pos.attributes
      result[:username] = pos.user.username
      result[:reply] = pos.replies
      result[:like] = pos.likes
      result[:tags] = pos.tags
      result
    end
    post_arr.push({posts_user_replied_to: reply_arr})
    render json: post_arr
  end
  def update
  end
end
