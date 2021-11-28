class Api::DaysController < ApiController
  before_action :find_day, only: %i[show update]

  def index
    @days = current_user.days.order(:day)
  end

  def update
    @day.update day_params
  end

  private

  def find_day
    @day = if params[:id] == 'today'
             current_user.current_day!
           else
             Day.find(params[:id])
           end
  end

  def day_params
    params.require(:day).permit(:wokeup_at, :turned_off_at)
  end
end
