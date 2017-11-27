class LikesController < ApplicationController
  before_action :authenticate_user

  def index
  end

  def create
    puts 'LIKES/CREATE/DESTROY CONTROLLER IN'
    @user = User.find_by_email(params[:email])
    puts '@user.inspect'
    puts @user.inspect

    puts 'params[:post_id]'
    puts params[:post_id]
    puts '@user[:id]'
    puts @user[:id]

    like = Like.where(post_id: params[:post_id])
    puts like.size
    if like.size > 0
      puts 'IN IF'
      # puts like[:user_id]
      like.each do |e|
        puts e[:user_id]
        if e[:user_id] == @user[:id]
          puts 'IN IF IF'

          puts 'e[:user_id]'
          puts e[:user_id]
          puts '@user[:id]'
          puts @user[:id]
          e.destroy
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
          puts post_arr
          render json: post_arr
          break
        else
          puts 'IN ELSE'
          @like = @user.likes.create!(
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
            puts 'post_arr'
            puts post_arr
          render json: post_arr
        end
      end




      # if like[:user_id] == @user[:id]
      #   puts 'IN IF IF'
      #   like.destroy
      #   # user_no_like = {user: @user}
      #   # render json: user_no_like
      #   @posts = Post.joins(:user).includes(:user).where(users: {building_id: params[:building_id]}).order('posts.id DESC')
      #   post_arr = @posts.map do |po|
      #     result = po.attributes
      #     result[:username] = po.user.username
      #     result[:reply] = po.replies
      #     result[:like] = po.likes
      #     result[:tags] = po.tags
      #     result[:building] = params[:building_id]
      #     result
      #   end
      #   puts post_arr
      #   render json: post_arr
      # else
      #   puts 'IN ELSE'
      #   @like = @user.likes.create!(
      #     post_id: params[:post_id]
      #   )
      #   # puts '@like'
      #   # puts @like.inspect
      #   # user_like = {user: @user, like: @like}
      #   # puts 'user_like'
      #   # puts user_like
      #   # render json: user_like
      #   @posts = Post.joins(:user).includes(:user).where(users: {building_id: params[:building_id]}).order('posts.id DESC')
      #   post_arr = @posts.map do |po|
      #     result = po.attributes
      #     result[:username] = po.user.username
      #     result[:reply] = po.replies
      #     result[:like] = po.likes
      #     result[:tags] = po.tags
      #     result[:building] = params[:building_id]
      #     result
      #     end
      #     puts 'post_arr'
      #     puts post_arr
      #   render json: post_arr
      # end
    else
      puts 'in else'
      @like = @user.likes.create!(
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
        puts 'post_arr'
        puts post_arr
      render json: post_arr
    end

    puts 'LIKES/CREATE/DESTROY CONTROLLER OUT'
  end
end
