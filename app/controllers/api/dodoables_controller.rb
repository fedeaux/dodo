class Api::DodoablesController < ApiController
  before_action :set_dodoable, only: [:show, :update]

  def index
    @dodoables = current_user.dodoables
  end

  private

  def set_dodoable
    @dodoable = current_user.dodoables.find(params[:id])
  end
end
