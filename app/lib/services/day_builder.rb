class Services::DayBuilder
  attr_accessor :day, :user

  def initialize(day)
    @day = day
    @user = day.user
  end

  def build
    day_schedule.each do |attributes|
      scheduled_to = day.time_of_day_in_user_timezone_adjusted_by_wokeup_at attributes[:scheduled_to], '07:00'
      dodoable = Dodoable.s attributes[:slug]

      day
        .dodones
        .where(dodoable_id: dodoable.id, scheduled_to: scheduled_to)
        .first_or_create
    end
  end

  def day_schedule
    week_schedule[day.weekday]
  end

  def week_schedule
    {
      sun: [
        { slug: 'meal:first', scheduled_to: '07:00' },
        { slug: 'meal:second', scheduled_to: '10:00' },
        { slug: 'meal:third', scheduled_to: '14:00' },
        { slug: 'meal:fourth', scheduled_to: '17:30' },
        { slug: 'meal:fifth', scheduled_to: '21:30' },
        { slug: 'chores:evening', scheduled_to: '21:45' },
      ],
      mon: [
        { slug: 'meal:first', scheduled_to: '07:00' },
        { slug: 'exercise:lake-run', scheduled_to: '08:00' },
        { slug: 'meal:second', scheduled_to: '10:00' },
        { slug: 'work:wordable', scheduled_to: '11:00' },
        { slug: 'meal:third', scheduled_to: '14:00' },
        { slug: 'meal:fourth', scheduled_to: '17:30' },
        { slug: 'meal:fifth', scheduled_to: '21:30' },
        { slug: 'chores:evening', scheduled_to: '21:45' },
      ],
      tue: [
        { slug: 'meal:first', scheduled_to: '07:00' },
        { slug: 'meal:second', scheduled_to: '10:00' },
        { slug: 'work:wordable', scheduled_to: '11:00' },
        { slug: 'meal:third', scheduled_to: '14:00' },
        { slug: 'meal:fourth', scheduled_to: '17:30' },
        { slug: 'meal:fifth', scheduled_to: '21:30' },
        { slug: 'chores:evening', scheduled_to: '21:45' },
      ],
      wed: [
        { slug: 'meal:first', scheduled_to: '07:00' },
        { slug: 'exercise:lake-run', scheduled_to: '08:00' },
        { slug: 'meal:second', scheduled_to: '10:00' },
        { slug: 'work:wordable', scheduled_to: '11:00' },
        { slug: 'meal:third', scheduled_to: '14:00' },
        { slug: 'meal:fourth', scheduled_to: '17:30' },
        { slug: 'meal:fifth', scheduled_to: '21:30' },
        { slug: 'chores:evening', scheduled_to: '21:45' },
      ],
      thu: [
        { slug: 'meal:first', scheduled_to: '07:00' },
        { slug: 'meal:second', scheduled_to: '10:00' },
        { slug: 'work:wordable', scheduled_to: '11:00' },
        { slug: 'meal:third', scheduled_to: '14:00' },
        { slug: 'meal:fourth', scheduled_to: '17:30' },
        { slug: 'meal:fifth', scheduled_to: '21:30' },
        { slug: 'chores:evening', scheduled_to: '21:45' },
      ],
      fri: [
        { slug: 'meal:first', scheduled_to: '07:00' },
        { slug: 'exercise:lake-run', scheduled_to: '08:00' },
        { slug: 'meal:second', scheduled_to: '10:00' },
        { slug: 'work:wordable', scheduled_to: '11:00' },
        { slug: 'meal:third', scheduled_to: '14:00' },
        { slug: 'meal:fourth', scheduled_to: '17:30' },
        { slug: 'meal:fifth', scheduled_to: '21:30' },
        { slug: 'chores:evening', scheduled_to: '21:45' },
      ],
      sat: [
        { slug: 'meal:first', scheduled_to: '07:00' },
        { slug: 'meal:second', scheduled_to: '10:00' },
        { slug: 'meal:third', scheduled_to: '14:00' },
        { slug: 'meal:fourth', scheduled_to: '17:30' },
        { slug: 'meal:fifth', scheduled_to: '21:30' },
        { slug: 'chores:evening', scheduled_to: '21:45' },
      ],
    }
  end
end
