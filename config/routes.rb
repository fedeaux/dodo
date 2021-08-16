Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
  end

  root to: 'spa#index'
  get '*path', to: 'spa#index'
end
