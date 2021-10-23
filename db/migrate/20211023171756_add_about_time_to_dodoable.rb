class AddAboutTimeToDodoable < ActiveRecord::Migration[6.1]
  def change
    add_column :dodoables, :about_time, :integer, default: 0
  end
end
