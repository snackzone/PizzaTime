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
      render json: {}
    end
  end

  private
  def user_params
    params.require(:user).permit(
      :password, :firstname, :surname, :zip, :email, :password_confirmation
    )
  end
end
