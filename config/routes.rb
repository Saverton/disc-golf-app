Rails.application.routes.draw do
  namespace :api do
    resources :friendships, only: %i[create destroy]
    resources :users, only: %i[index show] do
      resources :posts, only: %i[show create update destroy]
      resources :comments, only: %i[create update destroy]
      resources :likes, only: %i[create destroy]
    end
    resources :posts, only: %i[index] do
    end
    resources :courses, only: %i[index show create]
    post '/signup', to: 'users#create'
    post '/login', to: 'sessions#create'
    get '/me', to: 'sessions#show'
    delete '/logout', to: 'sessions#destroy'
  end

  get '*path', to: 'fallback#index', contraints: ->(req) { !req.xhr? && req.format.html? }
end
