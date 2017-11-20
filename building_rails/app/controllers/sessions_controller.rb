class SessionsController < ApplicationController

  def new
  end

  def create
    puts 'in create'

    if user = User.authenticate_with_credentials(params[:email], params[:password])

      session[:user_id] = user.id
      puts 'in if'
      puts session.inspect

      render json: user
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
