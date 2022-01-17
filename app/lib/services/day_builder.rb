class Services::DayBuilder
  WAKE_UP_AT = '06:15'

  attr_accessor :day, :user

  def initialize(day)
    @day = day
    @user = day.user
  end

  def build
    day_schedule.each do |attributes|
      scheduled_to = day.time_of_day_in_user_timezone_adjusted_by_wokeup_at attributes[:scheduled_to], WAKE_UP_AT
      dodoable = Dodoable.s attributes[:slug]

      unless dodoable
        raise "Seed #{attributes[:slug]}"
      end

      day
        .dodones
        .where(dodoable_id: dodoable.id, scheduled_to: scheduled_to)
        .first_or_create
    end
  end

  def day_schedule
    dodoables = [
      { slug: 'jump-wakeup', scheduled_to: '06:15' },
      { slug: 'exercise:treadmill:free', scheduled_to: '07:00' },
      { slug: 'meal:first', scheduled_to: '08:30' },
      { slug: 'meal:second', scheduled_to: '13:00' },
    ]

    dodoables.concat(
      [
        { slug: 'chores:evening', scheduled_to: '20:00' },
        { slug: 'meal:third', scheduled_to: '20:30' },
      ]
    )

    dodoables
  end
end
