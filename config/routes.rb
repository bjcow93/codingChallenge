Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :subscriptions
    resources :users
    resources :subscription_plans

    # GET "/customers?month='2019-01'"
    get '/customers/:id' => 'customers#billing', month: '2019-01'
  end 

  root "static_pages#root"
end