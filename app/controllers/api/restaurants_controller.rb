class Api::RestaurantsController < ApplicationController
  def index
    @restaurants = Restaurant.all
    if params[:filters]
      @restaurants = Restaurant.filtered(@restaurants, params[:filters])
    else
      @restaurants = @restaurants.limit(10)
    end

    @restaurants
  end
end
