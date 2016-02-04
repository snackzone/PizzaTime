class ReacreateUserZip < ActiveRecord::Migration
  def change
    add_column :users, :zip, :string, null: true
  end
end
