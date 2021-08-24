class CreateDays < ActiveRecord::Migration[6.1]
  def change
    create_table :days do |t|
      t.date :day
      t.datetime :wokeup_at
      t.datetime :turned_off_at

      t.timestamps
    end
  end
end
