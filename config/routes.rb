Rails.application.routes.draw do
  resources :users, only: [:create]
  get '/me', to: 'users#show'


  get '*path', 
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
