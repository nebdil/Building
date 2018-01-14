Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'posts#index'

  # NESTED ROUTES

  resources :buildings, only: [:index, :create, :show, :new] do
    resources :users, only: [:create, :show, :edit, :update, :index]
    resources :posts do
      resources :likes, only: [:index, :create, :destroy]
      resources :replies, only: [:index, :new, :create, :destroy]
    end
    resources :tags, only: [:create]
  end

  # REGISTER ROUTES

  get '/register' => 'users#new'
  post '/register' => 'users#create'

  # LOGIN ROUTES

  get '/login' => 'sessions#new'
  post '/login' => 'users#create'
  get '/logout' => 'sessions#destroy'

  # REACT-ROUTER HEROKU

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
