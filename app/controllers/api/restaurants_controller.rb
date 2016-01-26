class Api::RestaurantsController < ApplicationController
  def index
    @restaurants = Restaurant.all
    if params[:filters]
      @restaurants = Restaurant.filtered(@restaurants, params[:filters])
    end

    @restuarants
  end
end
