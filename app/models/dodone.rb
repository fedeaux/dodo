class Dodone < ApplicationRecord
  include Braindamage::Braindamageable

  belongs_to :dodoable
  belongs_to :day

  before_save :copy_started_at_to_finished_at_if_instantaneous
  after_commit :touch_dodoable

  def touch_dodoable
    dodoable.dodone_saved!
  end

  def copy_started_at_to_finished_at_if_instantaneous
    return unless dodoable.executor[:finished_at_behaviour] == 'instantaneous'

    self.finished_at = started_at
  end
end

# == Schema Information
#
# Table name: dodones
#
#  id          :bigint           not null, primary key
#  fields      :jsonb
#  finished_at :datetime
#  started_at  :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  day_id      :bigint           not null
#  dodoable_id :bigint           not null
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
