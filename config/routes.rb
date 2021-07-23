Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  namespace :api, defaults: { format: "json" } do
    get :people, to: 'people#index'
    get :email_character_counts, to: 'people#email_character_counts'
  end

  root to: "main#index"
end
