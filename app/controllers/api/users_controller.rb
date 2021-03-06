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
    if @user.email == "mike@turtlepower.com"
      render json: {errors: ["Cannot edit the guest account."]}, status: 403
    elsif @user.update(user_params)
      render :show
    else
      render json: {errors: @user.errors.full_messages}.to_json, status: 422
    end
  end

  def show
    @user = User.includes(reviews: [:restaurant]).find(params[:id])
    if @user
      render :show
    else
      render json: {}, status: 404
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
