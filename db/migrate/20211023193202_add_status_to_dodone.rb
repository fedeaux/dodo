class AddStatusToDodone < ActiveRecord::Migration[6.1]
  def change
    add_column :dodones, :status, :integer, default: 0
  end
end
