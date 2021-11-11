class Dodone < ApplicationRecord
  include Braindamage::Braindamageable

  belongs_to :dodoable
  belongs_to :day
  expose_associations

  expose :being_tracked?
  expose :finished?
  expose :started?
  expose :started?

  exposed_enum status: {
                 unstatusable: 0,
                 pending: 1,
                 succeeded: 2,
                 questionable: 3,
                 failed: 4,
                 skipped: 5
               }

  exposed_delegate :statusable?, to: :dodoable

  before_save :auto_assign_times_and_statuses
  before_create :ensure_dodoable_fields
  after_commit :touch_dodoable

  scope :scheduled, ->{ where('scheduled_to IS NOT NULL') }

  def touch_dodoable
    dodoable.dodone_saved!
  end

  def being_tracked?
    return false if dodoable.instantaneous?

    started_at && !finished_at
  end

  def started?
    !! started_at
  end

  def finished?
    !! finished_at
  end

  def auto_assign_times_and_statuses
    if dodoable.instantaneous?
      self.finished_at = started_at
    end

    if statusable?
      if unstatusable?
        self.status = :pending
      elsif pending? && started? && finished?
        self.status = :succeeded
      elsif failed? || skipped?
        self.started_at = nil
        self.finished_at = nil
      end
    end
  end

  def ensure_dodoable_fields
    self.fields = dodoable.fields.deep_merge self.fields.deep_symbolize_keys
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
#  status       :integer          default("unstatusable")
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

# Dodoable.s("bad-habit:fap")&.destroy
# Dodoable.scheduled.find_each do |dodoable|
#   dodoable.dodones.each do |dodone|
#     fields = dodone.fields
#     attributes = { status: 'pending' }

#     if fields['status'] && fields['status']['value'] == 'Ate it'
#       attributes[:fields] = fields.except('value')
#       attributes[:status] = 'failed'
#     end

#     dodone.update(attributes)
#   end
# end
# Dodone.find_each(&:save)
