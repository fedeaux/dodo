require "test_helper"

class DayDodoableTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

# == Schema Information
#
# Table name: day_dodoables
#
#  id          :bigint           not null, primary key
#  order       :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  day_id      :bigint           not null
#  dodoable_id :bigint           not null
#
# Indexes
#
#  index_day_dodoables_on_day_id       (day_id)
#  index_day_dodoables_on_dodoable_id  (dodoable_id)
#
# Foreign Keys
#
#  fk_rails_...  (day_id => days.id)
#  fk_rails_...  (dodoable_id => dodoables.id)
#
