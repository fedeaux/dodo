Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :days, except: %i[new edit]
    resources :dodoables, except: %i[new edit]
    resources :dodones, except: %i[new edit]
    resources :weeks, except: %i[new edit]
  end

  root to: 'spa#index'
  get '*path', to: 'spa#index'
end
