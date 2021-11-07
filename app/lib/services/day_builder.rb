class Services::DayBuilder
  attr_accessor :day, :user

  def initialize(day)
    @day = day
    @user = day.user
  end

  def build
    [
      { slug: 'meal:first', scheduled_to: '07:00' },
      { slug: 'meal:second', scheduled_to: '10:00' },
      { slug: 'work:wordable', scheduled_to: '11:00' },
      { slug: 'meal:third', scheduled_to: '14:00' },
      { slug: 'meal:fourth', scheduled_to: '17:30' },
      { slug: 'meal:fifth', scheduled_to: '21:30' },
      { slug: 'chores:evening', scheduled_to: '21:45' },
    ].each do |attributes|
      scheduled_to = day.time_of_day_in_user_timezone_adjusted_by_wokeup_at attributes[:scheduled_to], '07:00'
      dodoable = Dodoable.s attributes[:slug]

      day
        .dodones
        .where(dodoable_id: dodoable.id, scheduled_to: scheduled_to)
        .first_or_create
    end
  end
end
