class Api::ReviewsController < ApplicationController
  def create
    @review = Review.new(review_params)
    if @review.save
      render :show
    else
      render json: { errors: @review.errors.full_messages }, status: 422
    end
  end

  def show
    @review = Review.find(params[:id])
  end

  def update
    @review = Review.find(params[:id])
    if @review.update(review_params)
      render :show
    else
      render json: {}, status: 422
    end
  end

  def destroy
    @review = Review.find(params[:id])
    @review.destroy

    render json: {message: ["Your review has been deleted."]}
  end

  private
  def review_params
    params.require(:review).permit(:body, :user_id, :restaurant_id, :rating)
  end

end
