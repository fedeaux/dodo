class Services::DayBuilder
  WAKE_UP_AT = '07:45'

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
      { slug: 'jump-wakeup', scheduled_to: '07:45' },
      { slug: 'meal:first', scheduled_to: '08:00' },
      { slug: 'exercise:free-training', scheduled_to: '08:30' }
    ]

    if day.business?
      dodoables.concat(
        [
          { slug: 'retirement:investment-grooming', scheduled_to: '09:45' },
          { slug: 'meal:second', scheduled_to: '10:45' },
          { slug: 'retirement:first-deep-work', scheduled_to: '11:00' },
          { slug: 'meal:third', scheduled_to: '14:00' }
        ]
      )

      unless day.wed?
        dodoables.concat(
          [
            { slug: 'retirement:second-deep-work', scheduled_to: '14:30' },
          ]
        )
      end
    end

    dodoables.concat(
      [
        { slug: 'chores:evening', scheduled_to: '21:15' },
      ]
    )

    dodoables
  end
end
