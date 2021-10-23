class DropDayDodoables < ActiveRecord::Migration[6.1]
  def change
    drop_table :day_dodoables
  end
end
