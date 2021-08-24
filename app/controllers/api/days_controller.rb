class Api::DaysController < ApiController
  before_action :find_day, only: %i[show update]

  def update
    @day.update day_params
  end

  private

  def find_day
    @day = if params[:id] == 'today'
             current_user.days.where(day: Time.current).first_or_create
           else
             Day.find(params[:id])
           end
  end

  def day_params
    params.require(:day).permit(:wokeup_at)
  end
end
