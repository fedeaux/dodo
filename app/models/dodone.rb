class Dodone < ApplicationRecord
  include Braindamage::Braindamageable
  expose :being_tracked?
  expose :finished?
  expose :started?

  belongs_to :dodoable
  belongs_to :day

  before_save :copy_started_at_to_finished_at_if_instantaneous
  before_create :ensure_dodoable_fields
  after_commit :touch_dodoable

  scope :scheduled, ->{ where('scheduled_to IS NOT NULL') }

  def touch_dodoable
    dodoable.dodone_saved!
  end

  def being_tracked?
    return false if dodoable.executor[:finished_at_behaviour] == 'instantaneous'

    started_at && !finished_at
  end

  def started?
    !! started_at
  end

  def finished?
    !! finished_at
  end

  def copy_started_at_to_finished_at_if_instantaneous
    return unless dodoable.executor[:finished_at_behaviour] == 'instantaneous'

    self.finished_at = started_at
  end

  def ensure_dodoable_fields
    self.fields = dodoable.fields
  end
end

# == Schema Information
#
# Table name: dodones
#
#  id           :bigint           not null, primary key
#  fields       :jsonb
#  finished_at  :datetime
#  scheduled_to :datetime
#  started_at   :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  day_id       :bigint           not null
#  dodoable_id  :bigint           not null
#
# Indexes
#
#  index_dodones_on_day_id       (day_id)
#  index_dodones_on_dodoable_id  (dodoable_id)
#
# Foreign Keys
#
#  fk_rails_...  (day_id => days.id)
#  fk_rails_...  (dodoable_id => dodoables.id)
#
