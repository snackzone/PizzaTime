class Api::ReviewsController < ApplicationController
  def index
    user_id = params[:user_id]

    if user_id
      @user = User.find(user_id)
      @reviews = @user.reviews
      render json: @reviews
    else
      render json: {}
    end
  end
end
