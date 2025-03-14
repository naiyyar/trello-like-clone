Rails.application.routes.draw do
  resources :boards do
    resources :lists
  end

  resources :tasks, only: [:edit, :show]
  resources :lists do
    put :sort, on: :member
    resources :tasks do
      put :sort, on: :member
    end
  end
  devise_for :users
  get "/invite/accept", to: "board_invitations#accept", as: :accept_invitation
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  root "boards#index"
end
