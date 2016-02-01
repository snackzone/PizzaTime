Rails.application.routes.draw do
  Rails.application.routes.draw do
    root 'static_pages#root'
    namespace :api, defaults: { format: :json } do
      resources :restaurants, only: [:index, :show]
      resource :session, only: [:new, :create, :destroy, :show]
      resources :users, only: [:new, :create, :update, :show] do
        resources :reviews, only: [:index]
      end
    end
    resource :static_pages, only: :root

    resources :users, only: [:new, :create]
    resource :session, only: [:new, :create, :destroy, :show]
  end
end
