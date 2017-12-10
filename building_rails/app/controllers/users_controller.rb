class UsersController < ApplicationController
skip_before_action :authenticate_user!, only: [:create], raise: false
  require 'pp'

  # def create
  #   @user = User.find_by(email: params[:auth][:email])
  #   @building = Building.find_by(id: @user[:building_id])
  #   user_info = {user: @user, building: @building}
  #   render json: user_info
  # end

  def show
    puts "user#show in"
    @posts = Post.joins(:user).includes(:user).where(users: {building_id: params[:building_id]}).order('posts.id DESC')
    post_arr = @posts.map do |po|
      result = po.attributes
      result[:username] = po.user.username
      result[:reply] = po.replies
      result[:like] = po.likes
      result[:tags] = po.tags
      result[:building] = params[:building_id].to_i
      result
    end
    puts "user#show out"
    render json: post_arr
    # @building = Building.find_by(id: params[:building_id])
    # @user = @building.users.find_by(id: params[:id])
    # @posts = @user.posts.all.order('posts.id DESC')
    # post_arr = @posts.map do |po|
    #   result = po.attributes
    #   result[:username] = po.user.username
    #   result[:reply] = po.replies
    #   result[:like] = po.likes
    #   result[:tags] = po.tags
    #   result
    # end
    #
    # @rreplies = Reply.where(user_id: params[:id])
    # pp "rreplies=========>#{@rreplies}"
    # @rposts = @rreplies.to_a.map do |reply|
    #   reply.post
    #   pp reply.post
    # end
    #
    # pp "rposts=========>#{@rposts}"
    #
    # r_post_arr = @rposts.map do |pos|
    #   result = pos.attributes
    #   result[:username] = pos.user.username
    #   result[:reply] = pos.replies
    #   result[:like] = pos.likes
    #   result[:tags] = pos.tags
    #   result
    # end
    #
    # pp "r_post_arr=========>#{r_post_arr}"
    # uniq_post_arr = r_post_arr.uniq {|i| i["id"]}
    # pp "uniq_post_arr=========>#{uniq_post_arr}"
    #
    #
    # post_arr.push({posts_user_replied_to: uniq_post_arr})
    # render json: post_arr
  end

end
