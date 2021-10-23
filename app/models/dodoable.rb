class Dodoable < ApplicationRecord
  include Braindamage::Braindamageable

  belongs_to :user
  belongs_to :last_dodone_day, class_name: 'Day', optional: true
  has_many :dodones
  has_many :days, through: :dodones

  expose :being_tracked_dodone, type: :has_one, model: 'Dodone'
  expose :last_dodone, type: :has_one, model: 'Dodone'
  expose :todays_dodones, type: :has_many, model: 'Dodone'

  expose_associations

  expose :dodone_today?, type: :boolean

  exposed_enum nature: {
                 other: 0,
                 independent: 1,
                 habit: 2
               }

  exposed_enum about_time: {
                 chronometrable: 0,
                 durable: 1,
                 instantaneous: 2
               }

  def plugins_fields
    fields = {}

    if durable?
      fields[:duration] = {
        type: :duration
      }
    end

    return fields
  end

  def fields
    order = -1

    plugins_fields.merge(super.deep_symbolize_keys).map do |name, options|
      order += 1
      label = name.to_s.titleize

      options = {
        name: name,
        label: label,
        order: order,
        default: ''
      }.merge(options)

      if options[:type].to_sym == :select
        options[:placeholder] = "Select #{label}"
      end

      [name, options]
    end.to_h
  end

  def executor
    {
      save_on_field_changed: true
    }.merge(super.deep_symbolize_keys)
  end

  def dodone_today?
    last_dodone_day_id == user.current_day&.id
  end

  def dodone_saved!
    update(last_dodone_day: days.ordered.last)
  end

  def being_tracked_dodone
    dodones.find_by(finished_at: nil)
  end

  def todays_dodones
    return [] unless user.current_day&.id

    dodones.where(day_id: user.current_day&.id).order(:finished_at)
  end

  def last_dodone
    @last_dodone ||= dodones.order(:started_at).last
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
#  about_time         :integer          default("chronometrable")
#  executor           :jsonb
#  fields             :jsonb
#  name               :string
#  nature             :integer          default("other")
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
