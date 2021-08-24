class Day < ApplicationRecord
  include Braindamage::Braindamageable
  belongs_to :user
end
