class Day < ApplicationRecord
  include Braindamage::Braindamageable
  belongs_to :user
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
