class Day < ApplicationRecord
  include Braindamage::Braindamageable
  belongs_to :user
  has_many :day_dodoables

  scope :ordered, ->{
    order(:day)
  }

  before_save :ensure_day_dodoables, if: :wokeup_at_changed?

  def ensure_day_dodoables
    Services::DayBuilder.new(self).build
  end

  def dodoables
    day_dodoables.includes(:dodoable).order(:order).map(&:dodoable)
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
