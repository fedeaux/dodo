class CreateDayDodoables < ActiveRecord::Migration[6.1]
  def change
    create_table :day_dodoables do |t|
      t.belongs_to :day, null: false, foreign_key: true
      t.belongs_to :dodoable, null: false, foreign_key: true
      t.integer :order

      t.timestamps
    end
  end
end
