class Api::DodonesController < ApiController
  before_action :set_dodone, only: [:show, :update, :destroy]

  def create
    @dodone = Dodone.new dodone_params
    @dodone.save
  end

  def update
    @dodone.update dodone_params
  end

  def destroy
    @dodone.destroy
  end

  private

  def dodone_params
    params.require(:dodone).permit(:day_id,
                                   :started_at,
                                   :finished_at,
                                   :dodoable_id,
                                   :status,
                                   fields: {})
  end

  def set_dodone
    @dodone = Dodone.find(params[:id])
  end
end
