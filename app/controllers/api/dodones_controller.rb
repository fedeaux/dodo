class Api::DodonesController < ApiController
  def create
    @dodone = Dodone.new dodone_params
    @dodone.save
  end

  private

  def dodone_params
    params.require(:dodone).permit(:day_id, :started_at, :finished_at, :dodoable_id)
  end
end
