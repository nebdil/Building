class PostsController < ApplicationController
  def index
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
  def create
    puts 'POSTS CONTROLLER IN'
    user = User.find_by(id: 1)
    @post = user.posts.create!(
      content: params[:post_content]
    )
    @tag = Tag.find_or_create_by! name: params[:tag_name]
    @poststag = @post.poststags.create!(post_id: @post[:id], tag_id: @tag[:id])

    result = @post.attributes
    result[:username] = @post.user.username
    result[:reply] = @post.replies
    result[:like] = @post.likes
    result[:tags] = @post.tags
    result

    pp result

    render json: result
    puts 'POSTS CONTROLLER OUT'
  end
  def show
    puts 'in post show'
    @post = Post.find_by(id: params[:id])
    puts @post.inspect
    render json: @post
    puts 'out post show'
  end
  def update
  end
  def destroy
  end
end
