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

  def week_day(exercise_slug: 'exercise:lake-run')
    [
      { slug: 'jump-wakeup', scheduled_to: '07:00' },
      { slug: exercise_slug, scheduled_to: '08:00' },
      { slug: 'retirement:morning-setup', scheduled_to: '09:30' },
      { slug: 'meal:first', scheduled_to: '10:20' },
      { slug: 'retirement:first-deep-work', scheduled_to: '11:00' },
      { slug: 'meal:second', scheduled_to: '14:00' },
      { slug: 'retirement:second-deep-work', scheduled_to: '14:30' },
      { slug: 'meal:third', scheduled_to: '18:00' },
      { slug: 'chores:evening', scheduled_to: '21:30' },
      { slug: 'meal:fourth', scheduled_to: '21:45' },
    ]
  end

  def week_schedule
    {
      sun: [],
      mon: week_day,
      tue: week_day(exercise_slug: 'exercise:legacy-dodo'),
      wed: week_day,
      thu: week_day(exercise_slug: 'exercise:legacy-dodo'),
      fri: week_day,
      sat: week_day,
    }
  end
end
