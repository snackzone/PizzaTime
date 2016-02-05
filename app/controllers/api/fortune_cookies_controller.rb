class Api::FortuneCookiesController < ApplicationController
  def show
    @fortune_cookie = FortuneCookie.find(params[:id])
  end

  def random
    @fortune_cookie = FortuneCookie.all().sample
    render :show
  end
end
