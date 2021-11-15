class Api::DodoablesController < ApiController
  before_action :set_dodoable, only: [:show, :update, :destroy]

  def index
    @dodoables = @query.apply current_user.dodoables
  end

  private

  def set_dodoable
    @dodoable = current_user.dodoables.find(params[:id])
  end
end
