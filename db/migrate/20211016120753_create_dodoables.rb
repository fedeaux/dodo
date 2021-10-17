class CreateDodoables < ActiveRecord::Migration[6.1]
  def change
    create_table :dodoables do |t|
      t.string :name
      t.string :slug
      t.jsonb :executor, default: {}
      t.jsonb :trigger, default: {}
      t.jsonb :fields, default: {}
      t.belongs_to :last_dodone_day, foreign_key: { to_table: :days }
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
