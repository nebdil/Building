class BuildingsController < ApplicationController
  require 'pp'
  # before_action :authenticate_user
  def index
  end
  def create
  end
  def new
  end
  def show
    @posts = Post.joins(:user).includes(:user).where(users: {building_id: params[:id]}).order('posts.id DESC')
    post_arr = @posts.map do |po|
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
