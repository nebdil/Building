Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'buildings#show'

  # NESTED ROUTES

  resources :buildings, only: [:index, :create, :show, :new] do
    resources :users, only: [:create, :show, :edit, :update, :index]
    resources :posts do
      resources :likes, only: [:index, :create, :destroy]
      resources :replies, only: [:index, :new, :create, :destroy]
    end
  end

  # REGISTER ROUTES

  get '/register' => 'users#new'

  # LOGIN ROUTES

  post '/users' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'

end
