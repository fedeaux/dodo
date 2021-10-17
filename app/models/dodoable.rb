class Dodoable < ApplicationRecord
  include Braindamage::Braindamageable
  belongs_to :user
  belongs_to :last_dodone_day, class_name: 'Day', optional: true
  has_many :dodones
  has_many :days, through: :dodones

  expose :dodone_today?, type: :boolean

  def fields
    order = -1

    super.deep_symbolize_keys.map do |name, options|
      order += 1

      [
        name,
        {
          name: name,
          label: name,
          order: order,
          default: ''
        }.merge(options)]
    end.to_h
  end

  def dodone_today?
    last_dodone_day_id == user.current_day&.id
  end

  def dodone_saved!
    update(last_dodone_day: days.ordered.last)
  end

  def self.s(slug)
    find_by slug: slug
  end
end

# == Schema Information
#
# Table name: dodoables
#
#  id                 :bigint           not null, primary key
#  executor           :jsonb
#  fields             :jsonb
#  name               :string
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
