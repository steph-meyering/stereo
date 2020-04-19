# == Route Map
#
#                    Prefix Verb   URI Pattern                                                                              Controller#Action
#                 api_users POST   /api/users(.:format)                                                                     api/users#create {:format=>:json}
#                  api_user GET    /api/users/:id(.:format)                                                                 api/users#show {:format=>:json}
#                 api_songs GET    /api/songs(.:format)                                                                     api/songs#index {:format=>:json}
#                           POST   /api/songs(.:format)                                                                     api/songs#create {:format=>:json}
#                  api_song GET    /api/songs/:id(.:format)                                                                 api/songs#show {:format=>:json}
#                           PATCH  /api/songs/:id(.:format)                                                                 api/songs#update {:format=>:json}
#                           PUT    /api/songs/:id(.:format)                                                                 api/songs#update {:format=>:json}
#                           DELETE /api/songs/:id(.:format)                                                                 api/songs#destroy {:format=>:json}
#               api_session DELETE /api/session(.:format)                                                                   api/sessions#destroy {:format=>:json}
#                           POST   /api/session(.:format)                                                                   api/sessions#create {:format=>:json}
#                      root GET    /                                                                                        static_pages#root
#        rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
# rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#        rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
# update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#      rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create]
    resources :songs, only: [:show, :update, :destroy, :index, :create]
    resource :session, only: [:create, :destroy]
    # get '/', to: proc { [200, {}, ['']] } 
  end

  root to: 'static_pages#root'
end
