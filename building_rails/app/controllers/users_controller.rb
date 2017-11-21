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

    @rreplies = Reply.where(user_id: params[:id])
    pp "rreplies=========>#{@rreplies}"
    @rposts = @rreplies.to_a.map do |reply|
      reply.post
      pp reply.post
    end

    pp "rposts=========>#{@rposts}"

    r_post_arr = @rposts.map do |pos|
      result = pos.attributes
      result[:username] = pos.user.username
      result[:reply] = pos.replies
      result[:like] = pos.likes
      result[:tags] = pos.tags
      result
    end

    pp "r_post_arr=========>#{r_post_arr}"
    uniq_post_arr = r_post_arr.uniq {|i| i["id"]}
    pp "uniq_post_arr=========>#{uniq_post_arr}"


    post_arr.push({posts_user_replied_to: uniq_post_arr})
    render json: post_arr
  end
  def update
  end
end
