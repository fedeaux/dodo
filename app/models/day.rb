class Day < ApplicationRecord
  include Braindamage::Braindamageable
  belongs_to :user
  has_many :day_dodoables
  has_many :dodones

  scope :ordered, ->{
    order(:day)
  }

  before_save :ensure_scheduled_dodones, if: :wokeup_at_changed?

  def ensure_scheduled_dodones
    Services::DayBuilder.new(self).build
  end

  def schedule_dodones
    dodones.includes(:dodoable).reject do |dodone|
      dodone.dodoable.executor[:finished_at_behaviour] == 'instantaneous'
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
