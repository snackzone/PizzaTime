class Api::PhotosController < ApplicationController
  def create
    @photo = current_user.photos.new(photo_params)
    @photo.restaurant_id = params[:restaurant_id]
    if @photo.save
      render json: {}
    else
      render json: {}, status: 422
    end
  end



  private

  def photo_params
    params.require(:photo).permit(:caption, :upload)
  end
end
