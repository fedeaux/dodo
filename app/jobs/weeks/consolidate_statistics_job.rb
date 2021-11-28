class Weeks::ConsolidateStatisticsJob < ApplicationJob
  def perform(week_id)
    week = Week.find week_id
    days_with_wakeup_at = week.days.select(&:wokeup_at)

    average_wokeup_at = days_with_wakeup_at.map do |day|
      (day.wokeup_at - day.beginning_of_user_day).seconds
    end.sum / days_with_wakeup_at.count

    week.update(statistics: [
                  {
                    key: :average_wokeup_at,
                    label: "Woke up at",
                    value: Time.at(average_wokeup_at).utc.strftime("%H:%M")
                  }
                ]
               )
  end
end
