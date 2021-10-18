class Api::DodoablesController < ApiController
  before_action :set_dodoable, only: [:show, :update, :destroy]

  def index
    # TODO: Review collection cache keys
    @query = query

    @dodoables = current_user.dodoables

    query['scopes'].each do |scope|
      @dodoables = @dodoables.send(scope)
    end
  end

  private

  def set_dodoable
    @dodoable = current_user.dodoables.find(params[:id])
  end

  def query
    return nil unless params[:query]

    JSON.parse params[:query]
  end
end
