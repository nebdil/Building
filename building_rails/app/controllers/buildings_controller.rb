class BuildingsController < ApplicationController
  require 'pp'

  def index
  end

  def create
  end

  def new
  end

  def show
    post_arr = []
    building = Building.find_by(id: params[:id])
    pp building
    @users = building.users.all
    pp @users
    @users.each do |u|
      pp u.posts.all
      pp u.username
      post_arr.push (u.posts.all)
    end
    render json: post_arr
  end

end
