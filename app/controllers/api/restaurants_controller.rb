class Api::RestaurantsController < ApplicationController
  def index
    @restaurants = Restaurant.includes(reviews: [:user]).all

    # debugger

    if params[:filters]
      @restaurants = Restaurant.filtered(@restaurants, params[:filters])
    else
      @restaurants = @restaurants.limit(10)
    end

    @restaurants
  end

  def show
    @restaurant = Restaurant.includes(reviews: [:user]).find(params[:id])
  end
end
