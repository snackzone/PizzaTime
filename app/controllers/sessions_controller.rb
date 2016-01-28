class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    # if @user
    #   sign_in(@user)
    #   redirect_to root_url
    # else
    #   flash.now[:errors] = ["Invalid email or password"]
    #   render :new
    # end

    if @user
      sign_in(@user)
      render json: @user.to_json
    else
      render json: {} #ERRROR MESSAGE GOES HERE
    end
  end

  def destroy
    sign_out
    render json: {}
  end
end
