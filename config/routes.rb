Rails.application.routes.draw do
  Rails.application.routes.draw do
    root 'static_pages#root'
    namespace :api, defaults: { format: :json } do
      resources :restaurants, only: [:index, :show] do
        resources :photos, only: [:create]
      end
      resources :photos, only: :destroy
      resource :session, only: [:new, :create, :destroy, :show]
      resources :reviews, only: [:new, :create, :update, :show, :destroy]
      resources :users, only: [:new, :create, :update, :show] do
        resources :reviews, only: [:index]
      end
      get "fortune_cookie", to: "fortune_cookies#random"
      get "search", to: "utils#search"
    end
    get 'auth/facebook/callback', to: 'sessions#omniauth_facebook'
    resource :static_pages, only: :root
  end
end
