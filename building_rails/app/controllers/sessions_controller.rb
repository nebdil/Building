class SessionsController < ApplicationController

  def new
  end

  def create
    puts 'in create'
    if user = User.authenticate_with_credentials(params[:email], params[:password])
    url_ok = {url: "/buildings/#{user[:building_id]}/posts"}
    puts url_ok
      session[:user_id] = user.id
      puts 'in if'
      puts session.inspect

      render json: url_ok
    else
      url_no = {url: '/login'}
      puts 'in else'

      render json: url_no
    end
  end

  def destroy
    url_logout = {url: '/login'}
    session[:user_id] = nil
    puts 'in destroy'
    render json: url_logout
  end

end
