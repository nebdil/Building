class UsersController < ApplicationController
  require 'pp'
  def index
  end
  def create
    url_ok = {url: "/buildings/1/posts"}
    puts 'params'
    puts user_params
    @user = User.new(
      # user_params
      {
      username: params[:username],
      email: params[:email],
      password: params[:password],
      password_confirmation: params[:password_confirmation],
      building_id: 1
      }
    )
    puts @user.inspect

    if @user.save
      session[:user_id] = @user.id
      # redirect_to '/buildings/1/posts'
      puts @user.email
      ApplicationMailer.register_email(@user).deliver!

      # mg_client = Mailgun::Client.new ENV['PRIVATE_API_KEY_MAILGUN']
      # message_params = {:from    => ENV['FROM_EMAIL'],
      #                   :to      => @user.email,
      #                   :subject => 'Hello from your Building!',
      #                   :text    => 'Thank you for registering to your Building! Now you can connect with your neighbors!'}
      # mg_client.send_message ENV['DOMAIN'], message_params


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

  private
  def user_params
    params.permit(:username, :email, :password, :password_confirmation)
  end
end
