class Services::DayBuilder
  attr_accessor :day, :user

  def initialize(day)
    @day = day
    @user = day.user
  end

  def build
    [
      { slug: 'chores:wakeup', scheduled_to: '07:50' },
      { slug: 'meal:first', scheduled_to: '08:00' },
      { slug: 'work:wordable', scheduled_to: '09:00' },
      { slug: 'meal:second', scheduled_to: '11:00' },
      { slug: 'meal:third', scheduled_to: '14:00' },
      { slug: 'meal:fourth', scheduled_to: '17:30' },
      { slug: 'meal:fifth', scheduled_to: '21:00' },
      { slug: 'chores:evening', scheduled_to: '21:30' },
    ].each do |attributes|
      scheduled_to = day.time_of_day_in_user_timezone attributes[:scheduled_to]
      dodoable = Dodoable.s attributes[:slug]

      day
        .dodones
        .where(dodoable_id: dodoable.id, scheduled_to: scheduled_to)
        .first_or_create
    end
  end
end
