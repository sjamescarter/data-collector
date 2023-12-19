Rails.application.routes.draw do
  resources :data
  resources :goals, only: [:index, :create, :update, :destroy]
  resources :students, only: [:index, :create]
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'

  get '/motivated_students/:n', to: 'students#motivated_students'

  get '*path', 
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
