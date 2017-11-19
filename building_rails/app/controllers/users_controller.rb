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
      pp po.likes
      result = po.attributes
      result[:username] = po.user.username
      result[:reply] = po.replies
      result[:like] = po.likes
      result[:tags] = po.tags
      result
    end
    render json: post_arr
  end
  def update
  end
end
