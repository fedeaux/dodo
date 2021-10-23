class User < ApplicationRecord
  has_many :days
  has_many :dodoables

  def current_day
    days.where(day: current_time).first
  end

  def current_day!
    days.where(day: current_time).first_or_create
  end

  def current_time
    # fuck
    Time.current.utc + utc_offset.seconds - 4.hours
  end

  def utc_offset
    Time.current.in_time_zone(timezone).utc_offset
  end
end

# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  email      :string
#  name       :string
#  timezone   :string           default("UTC")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
