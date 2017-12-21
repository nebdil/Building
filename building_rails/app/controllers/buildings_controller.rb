class BuildingsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create], raise: false

  require 'pp'
  def index
    @buildings = Building.all
    render json: @buildings
  end
  def create
    puts params
    @building = Building.find_or_initialize_by(address: params[:address])
    puts @building.inspect
    if @building.save
      puts 'in if'
      @user = @building.users.new({
                username: params[:username],
                email: params[:email],
                password: params[:password],
                password_confirmation: params[:password_confirmation]
              })
      ###
      @user.save!
      # if @user.save
      #   ApplicationMailer.register_email(@user).deliver!
      #
      #   mg_client = Mailgun::Client.new ""
      #   message_params = {:from    => "dilannebioglu@gmail.com",
      #                     :to      => @user.email,
      #                     :subject => 'Hello from your Building!',
      #                     :text    => 'Thank you for registering to your Building! Now you can connect with your neighbors!'}
      #   mg_client.send_message "", message_params
      # end
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
    puts 'buildings#show in'
    puts 'buildings#show out'
    head :ok
  end
end
