class CreateWeeks < ActiveRecord::Migration[6.1]
  def change
    create_table :weeks do |t|
      t.date :start_day
      t.jsonb :statistics
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
