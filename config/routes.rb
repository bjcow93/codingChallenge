Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :subscriptions
    resources :users
    resources :subscription_plans
    # resources :customers
    get '/customers/:id' => 'customers#show', month: '2019-01'
  end 

  root "static_pages#root"
end