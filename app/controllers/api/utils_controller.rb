class Api::UtilsController < ApplicationController
  def search
  @search_results = PgSearch
    .multisearch(params[:query])
    .includes(:searchable)
  # debugger
  end
end