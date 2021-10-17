class Services::DayBuilder
  attr_accessor :day, :user

  def initialize(day)
    @day = day
    @user = day.user
  end

  def build
    order = 0

    %w[
      meal:first
      meal:second
      meal:third
      meal:fourth
      meal:fifth
      chores:evening
    ].each do |slug|
      dodoable = user.dodoables.s slug

      day
        .day_dodoables
        .where(dodoable: dodoable)
        .first_or_create
        .update(order: order)

      order += 1
    end
  end
end
