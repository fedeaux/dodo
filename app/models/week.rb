class Week < ApplicationRecord
  include Braindamage::Braindamageable
  belongs_to :user
  expose :end_day, type: :datetime

  def days
    user.days.where(day: start_day..end_day)
  end

  def end_day
    start_day + 6.days
  end
end

# == Schema Information
#
# Table name: weeks
#
#  id         :bigint           not null, primary key
#  start_day  :date
#  statistics :jsonb
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_weeks_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
