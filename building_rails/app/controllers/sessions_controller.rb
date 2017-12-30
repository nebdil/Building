class SessionsController < ApplicationController

  def new
  end

  def create
    puts 'in create'
    # finds the user trying to log in
    if user = User.authenticate_with_credentials(params[:session][:auth][:email], params[:session][:auth][:password])
      # returns the building they belongs to
      @building_id = user.building_id
      render json: @building_id
    # url_ok = {url: "/buildings/#{user[:building_id]}/posts"}
    # puts url_ok
    #   session[:user_id] = user.id
    #   puts 'in if'
    #   puts session.inspect
    #
    #   render json: url_ok

    # if there is no such user
    else
      puts 'no user'
    #   url_no = {url: '/login'}
    #   puts 'in else'
    #
    #   render json: url_no
    end
  end

  def destroy
    url_logout = {url: '/login'}
    session[:user_id] = nil
    puts 'in destroy'
    render json: url_logout
  end

end
