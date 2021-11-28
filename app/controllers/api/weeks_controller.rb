class Api::WeeksController < ApiController
  before_action :find_week, only: %i[show update]

  def index
    @weeks = current_user.weeks.order(:start_day)
  end
end
