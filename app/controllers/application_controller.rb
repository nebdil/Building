class ApplicationController < ActionController::API
  include Knock::Authenticable

  def fallback_index_html
    render :file => 'public/index.html'
  end

  private

  # def current_user
  #   @current_user ||= User.find(session[:user_id]) if session[:user_id]
  # end
  # # helper_method :current_user
  #
  # def authorize
  #   redirect_to '/login' unless current_user
  # end

end
