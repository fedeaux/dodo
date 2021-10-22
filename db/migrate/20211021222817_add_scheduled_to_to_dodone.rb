class AddScheduledToToDodone < ActiveRecord::Migration[6.1]
  def change
    add_column :dodones, :scheduled_to, :datetime
  end
end
