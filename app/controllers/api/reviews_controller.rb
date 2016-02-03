class Api::ReviewsController < ApplicationController
  def index
    #don't think this is used. Also, badly-written.
    user_id = params[:user_id]

    if user_id
      @user = User.find(user_id)
      @reviews = @user.reviews
      render json: @reviews
    else
      render json: {}
    end
  end

  def create
    @review = Review.new(review_params)
    if @review.save
      render :show
    else
      render json: { errors: @review.errors.full_messages }, status: 422
    end
  end

  def update
    @review = Review.find(params[:id])
    if @review.update(review_params)
      render :show
    else
      render json: {}, status: 422
    end
  end

  private
  def review_params
    params.require(:review).permit(:body, :user_id, :restaurant_id, :rating)
  end

end
