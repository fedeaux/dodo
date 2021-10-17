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
    # TimeZone stuff
    Time.current - 5.hours
  end
end

# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  email      :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
