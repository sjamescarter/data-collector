Rails.application.routes.draw do
  resources :goals
  resources :students, only: [:index, :create, :show]
  resources :my_students
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'

  get '*path', 
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
