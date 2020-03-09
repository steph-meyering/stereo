Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:show, :create] do
      resources :songs, only: [:create]
    end
    resources :songs, only: [:show, :index]
    resource :session, only: [:create, :destroy]
  end

  root to: 'static_pages#root'
end