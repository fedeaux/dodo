class Day < ApplicationRecord
  include Braindamage::Braindamageable

  belongs_to :user
  has_many :dodones
  expose_associations

  expose :schedule_dodones, type: :has_many, model: 'Dodone'

  scope :ordered, ->{
    order(:day)
  }

  before_save :ensure_scheduled_dodones, if: :wokeup_at_changed?

  def beginning_of_day
    day.to_time(:utc).beginning_of_day
  end

  def end_of_day
    day.to_time(:utc).end_of_day
  end

  def beginning_of_user_day
    @beginning_of_user_day ||= beginning_of_day - user.utc_offset.seconds
  end

  def end_of_user_day
    @end_of_user_day ||= end_of_day - user.utc_offset.seconds
  end

  def time_of_day_in_user_timezone(string_time)
    parts = string_time.split(':').map(&:to_i)
    beginning_of_day + parts[0].hours + parts[1].minutes - user.utc_offset.seconds
  end

  def time_of_day_in_user_timezone_adjusted_by_wokeup_at(string_time, string_expected_base_wokeup_at)
    time_of_day_in_user_timezone(string_time) + wokeup_at_adjustment(string_expected_base_wokeup_at).seconds
  end

  def wokeup_at_adjustment(string_expected_base_wokeup_at)
    expected_base_wokeup_at = time_of_day_in_user_timezone string_expected_base_wokeup_at
    wokeup_at - expected_base_wokeup_at
  end

  def ensure_scheduled_dodones
    return if dodones.any?

    Services::DayBuilder.new(self).build
  end

  def schedule_dodones
    dodones.includes(:dodoable).reject do |dodone|
      dodone.dodoable.instantaneous? || dodone.dodoable.nested?
    end
  end

  def weekday
    day.strftime('%a').downcase.to_sym
  end

  def week
    Week.where(user_id: user_id, start_day: day.beginning_of_week).first_or_create
  end
end

# == Schema Information
#
# Table name: days
#
#  id            :bigint           not null, primary key
#  day           :date
#  turned_off_at :datetime
#  wokeup_at     :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :bigint           not null
#
# Indexes
#
#  index_days_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
