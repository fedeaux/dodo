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

  def time_of_day_in_user_timezone(string_time)
    parts = string_time.split(':').map(&:to_i)
    beginning_of_day + parts[0].hours + parts[1].minutes - user.utc_offset.seconds
  end

  def ensure_scheduled_dodones
    Services::DayBuilder.new(self).build
  end

  def schedule_dodones
    dodones.includes(:dodoable).reject do |dodone|
      dodone.dodoable.instantaneous?
    end
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
