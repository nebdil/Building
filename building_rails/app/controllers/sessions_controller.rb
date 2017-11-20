class SessionsController < ApplicationController

  def new
  end

  def create
    puts 'in create'
    url_ok = {url: '/buildings/1/posts'}

    if user = User.authenticate_with_credentials(params[:email], params[:password])

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
   session[:user_id] = nil
   redirect_to '/login'
  end

end
