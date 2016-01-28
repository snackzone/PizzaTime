Rails.application.routes.draw do
  Rails.application.routes.draw do
    root 'static_pages#root'
    namespace :api, defaults: { format: :json } do
      resources :restaurants, only: [:index]
      resource :session, only: [:new, :create, :destroy, :show]
    end
    resource :static_pages, only: :root

    resources :users, only: [:new, :create]
    resource :session, only: [:new, :create, :destroy, :show]
  end
end
