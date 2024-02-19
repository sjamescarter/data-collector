Rails.application.routes.draw do
  resources :organizations, only: [:index, :create, :destroy] do
    resources :students, only: [:create]
    resources :users, only: [:create]
  end
  resources :students, only: [:index, :create]
  resources :goals, only: [:index, :create, :update, :destroy] do
    resources :objectives, only: [:create]
  end
  resources :objectives, only: [:update, :destroy] do
    resources :assessments, only: [:create, :update]
  end
  resources :assessments, only: [:destroy]
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'

  get '/motivated_students/:n', to: 'students#motivated_students'

  get '*path', 
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
