class BuildingsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create], raise: false

  require 'pp'
  # before_action :authenticate_user
  def index
    @buildings = Building.all
    render json: @buildings
  end
  def create
    puts params
    @building = Building.find_or_initialize_by(address: params[:address])
    puts @building.inspect
    if @building.save
      url_ok = {url: "/buildings/#{@building[:id]}/posts"}
      puts 'in if'
      @user = @building.users.new({
                username: params[:username],
                email: params[:email],
                password: params[:password],
                password_confirmation: params[:password_confirmation]
              })
      ###
      # @user.save!
      if @user.save
        ApplicationMailer.register_email(@user).deliver!

        mg_client = Mailgun::Client.new "key-a2cf31de4910b2743d7a19585c3f4c85"
        message_params = {:from    => "dilannebioglu@gmail.com",
                          :to      => @user.email,
                          :subject => 'Hello from your Building!',
                          :text    => 'Thank you for registering to your Building! Now you can connect with your neighbors!'}
        mg_client.send_message "sandboxcc6313cdfcfd4c37a39123dd094ce1ab.mailgun.org", message_params
      end
      render json: @user
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
      result[:building] = params[:id]
      result
    end
    render json: post_arr
  end
end
