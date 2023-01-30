Rails.application.routes.draw do
  namespace :api do
    resources :friendships, only: %i[create destroy]
    resources :users, only: %i[index show]
    post '/signup', to: 'users#create'
    post '/login', to: 'sessions#create'
    get '/me', to: 'sessions#show'
    delete '/logout', to: 'sessions#destroy'
  end
end
