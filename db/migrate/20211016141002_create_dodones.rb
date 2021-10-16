class CreateDodones < ActiveRecord::Migration[6.1]
  def change
    create_table :dodones do |t|
      t.belongs_to :dodoable, null: false, foreign_key: true
      t.belongs_to :day, null: false, foreign_key: true
      t.datetime :started_at
      t.datetime :finished_at
      t.jsonb :fields, default: {}

      t.timestamps
    end
  end
end
