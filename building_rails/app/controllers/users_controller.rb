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

    # @user_replies = Reply.all.find_by(user_id: params[:id])
    # @user_replies_arr = [@user_replies]
    # @posts_replied = Post.find_by(id: @user_replies[:post_id])
    # @posts_replied_arr = [@posts_replied]
    @rposts = Post.all
    @rreplies = @rposts.joins(:replies).where(user_id: params[:id])

    reply_arr = @rreplies.map do |pos|
      result = pos.attributes
      result[:username] = pos.user.username
      result[:reply] = pos.replies
      result[:like] = pos.likes
      result[:tags] = pos.tags
      result
    end

    uniq_reply_arr = reply_arr.uniq! {|i| i["id"]}
    pp "uniq_reply_arr=========>#{uniq_reply_arr}"


    post_arr.push({posts_user_replied_to: uniq_reply_arr})
    render json: post_arr
  end
  def update
  end
end
