class Api::PhotosController < ApplicationController
  def create
    @photo = current_user.photos.new(photo_params)
    @photo.restaurant_id = params[:restaurant_id]
    if @photo.save
      render :show
    else
      render json: {}, status: 422
    end
  end

  def destroy
    photo = Photo.find(params[:id])
    
    if photo.user_id == current_user.id
      photo.destroy!
    end

    render json: {}
  end

  private

  def photo_params
    params.require(:photo).permit(:caption, :upload)
  end
end
