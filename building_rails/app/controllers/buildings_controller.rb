class BuildingsController < ApplicationController
  require 'pp'
  # before_action :authenticate_user
  def index
  end
  def create
    url_ok = {url: '/buildings/1/posts'}
    @building = Building.new(
      {
      street_no: params[:street_no],
      street_name: params[:street_name],
      city: params[:city],
      province: params[:province],
      country: params[:country],
      postal_code: params[:postal_code]
      }
    )
    puts @building.inspect

    if @building.save
      puts 'in if'
      render json: url_ok
    elsif Building.find_by()
      url_no = {url: '/register'}
      puts 'in elsif'
      render json: url_no
    else
      url_no = {url: '/register'}
      puts 'in else'
      render json: url_no
    end
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
