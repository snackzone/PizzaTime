class Api::SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      sign_in(@user)
      render :show
    else
      render json: {errors: ["Invalid username or password."]}.to_json, status: 401
    end
  end

  def show
    @user = User.includes(reviews: [:restaurant]).find(current_user.id)
    if @user
      render "api/users/show"
    else
      render json: {}, status: 404
    end
  end

  def destroy
    sign_out
    render json: {}
  end
end
