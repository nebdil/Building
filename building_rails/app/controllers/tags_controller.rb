class TagsController < ApplicationController
  before_action :authenticate_user

  def index
  end
  def create
    puts 'TAGS CONTROLLER IN'
    @tag = Tag.create!(
      name: params[:tag]
    )
    puts @tag
    puts 'TAGS CONTROLLER OUT'
  end
end
