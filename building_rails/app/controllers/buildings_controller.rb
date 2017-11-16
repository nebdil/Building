class BuildingsController < ApplicationController

  def index
    @posts = Post.all
    render json: @posts
  end

  def create
  end

  def new
  end

  def show

  end

end
