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
#  id                 :bigint           not null, primary key
#  about_time         :integer          default("chronometrable")
#  active             :boolean          default(TRUE)
#  executor           :jsonb
#  fields             :jsonb
#  name               :string
#  nature             :integer          default("scheduled")
#  slug               :string
#  trigger            :jsonb
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  last_dodone_day_id :bigint
#  user_id            :bigint           not null
#
# Indexes
#
#  index_dodoables_on_last_dodone_day_id  (last_dodone_day_id)
#  index_dodoables_on_user_id             (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (last_dodone_day_id => days.id)
#  fk_rails_...  (user_id => users.id)
#
