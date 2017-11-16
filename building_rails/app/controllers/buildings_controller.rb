class BuildingsController < ApplicationController

  def index
    @posts = Post.all
    @posts.to_json
  end

  def create
  end

  def new
  end

  def show

  end

end
