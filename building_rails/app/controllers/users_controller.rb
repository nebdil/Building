class UsersController < ApplicationController
  require 'pp'
  def index
  end
  def create
    url_ok = {url: '/buildings/1/posts'}
    puts 'params'
    puts user_params
    user = User.new(
      # user_params
      {
      username: params[:username],
      email: params[:email],
      password: params[:password],
      password_confirmation: params[:password_confirmation],
      building_id: 1
      }
    )
    puts user.inspect

    if user.save
      session[:user_id] = user.id
      # redirect_to '/buildings/1/posts'
      render json: url_ok
    elsif User.find_by(email: params[:email])
      url_no = {url: '/register'}
      # flash[:notice] = "Email is taken!"
      # redirect_to '/register'
      puts 'in elsif'
      render json: url_no
    else
      url_no = {url: '/register'}
      # flash[:notice] = "Something went wrong while signing up"
      # redirect_to '/register'
      puts 'in else'
      render json: url_no
    end
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

    @user_replies = Reply.all.find_by(user_id: params[:id])
    @user_replies_arr = [@user_replies]
    @posts_replied = Post.find_by(id: @user_replies[:post_id])
    @posts_replied_arr = [@posts_replied]

    reply_arr = @posts_replied_arr.map do |pos|
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

  private
  def user_params
    params.permit(:username, :email, :password, :password_confirmation)
  end
end
