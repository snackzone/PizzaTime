Rails.application.routes.draw do
  Rails.application.routes.draw do
    root 'static_pages#root'
    namespace :api, defaults: { format: :json } do
      resources :restaurants, only: [:index]
    end
    resource :static_pages, only: :root
  end
end
