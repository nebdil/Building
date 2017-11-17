class PostsController < ApplicationController
  require 'pp'

  def index
    post_arr = []
    building = Building.find_by(id: params[:building_id])
    pp building
    @users = building.users.all
    pp @users
    @users.each do |u|
      pp u.posts.all
      post_arr.push (u.posts.all)
    end
  render json: post_arr
  end
  
  def create
  end
  def show
  end
  def update
  end
  def destroy
  end
end
