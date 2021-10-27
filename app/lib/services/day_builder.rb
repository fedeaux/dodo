class Services::DayBuilder
  attr_accessor :day, :user

  def initialize(day)
    @day = day
    @user = day.user
  end

  def build
    [
      { slug: 'chores:wakeup', scheduled_to: '08:00' },
      { slug: 'meal:first', scheduled_to: '08:15' },
      { slug: 'meal:second', scheduled_to: '11:00' },
      { slug: 'meal:third', scheduled_to: '15:30' },
      { slug: 'meal:fourth', scheduled_to: '19:30' },
      { slug: 'chores:evening', scheduled_to: '22:00' },
      { slug: 'meal:fifth', scheduled_to: '23:00' },
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
