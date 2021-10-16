require "test_helper"

class DodoableTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

# == Schema Information
#
# Table name: dodoables
#
#  id         :bigint           not null, primary key
#  executor   :jsonb
#  fields     :jsonb
#  name       :string
#  slug       :string
#  trigger    :jsonb
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_dodoables_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
