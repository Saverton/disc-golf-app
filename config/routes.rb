Rails.application.routes.draw do
  namespace :api do
    resources :friendships, only: %i[create destroy]
    resources :users, only: %i[index show]
    get '/signup', to: 'users#create'
    get '/login', to: 'sessions#create'
    get '/me', to: 'sessions#show'
    get '/logout', to: 'sessions#destroy'
  end
end
