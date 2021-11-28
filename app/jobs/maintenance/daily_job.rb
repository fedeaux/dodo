class Maintenance::DailyJob < ApplicationJob
  def perform
    ensure_weeks
    fix_dodones_times
    fail_stale_scheduled_dodones
  end

  def ensure_weeks
    Day.order(:day).each(&:week)
  end

  def fail_stale_scheduled_dodones
    User.find_each do |user|
      user.days.where('id NOT IN (?)', user.current_day&.id).includes(:dodones).order(:day).each do |day|
        day.dodones.each do |dodone|
          if dodone.statusable? && !dodone.started_at
            dodone.update(status: :failed)
          end
        end
      end
    end
  end

  def fix_dodones_times
    Day.includes(:user, :dodones).find_each do |day|
      day.dodones.each do |dodone|
        if dodone.started_at && (dodone.started_at - day.beginning_of_user_day).abs > 1.day
          started_at = dodone.started_at.to_datetime.change(
            day: day.beginning_of_user_day.day,
            month: day.beginning_of_user_day.month,
            year: day.beginning_of_user_day.year
          )

          dodone.update(started_at: started_at)
        end

        if dodone.finished_at && (dodone.finished_at - day.beginning_of_user_day).abs > 1.day
          finished_at = dodone.finished_at.to_datetime.change(
            day: day.beginning_of_user_day.day,
            month: day.beginning_of_user_day.month,
            year: day.beginning_of_user_day.year
          )

          dodone.update(finished_at: finished_at)
        end
      end
    end
  end
end
