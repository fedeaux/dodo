class CreateDodoables < ActiveRecord::Migration[6.1]
  def change
    create_table :dodoables do |t|
      t.string :name
      t.string :slug
      t.jsonb :executor
      t.jsonb :trigger
      t.jsonb :fields
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
