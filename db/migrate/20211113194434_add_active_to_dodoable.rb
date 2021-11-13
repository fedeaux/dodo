class AddActiveToDodoable < ActiveRecord::Migration[6.1]
  def change
    add_column :dodoables, :active, :boolean, default: true
  end
end
