class BuildingsController < ApplicationController
  require 'pp'
  def index
  end
  def create
  end
  def new
  end
  def show
    @posts = Post.joins(:user).includes(:user).where(users: {building_id: params[:id]})
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
end
