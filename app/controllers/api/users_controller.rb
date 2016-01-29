class Api::UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      render :show
    else
      render json: {errors: @user.errors.full_messages}.to_json, status: 422
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: {errors: @user.errors.full_messages}.to_json, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(
      :password,
      :firstname,
      :surname,
      :zip,
      :email,
      :password_confirmation,
      :photo
    )
  end
end
