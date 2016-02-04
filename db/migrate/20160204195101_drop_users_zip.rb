class DropUsersZip < ActiveRecord::Migration
  def change
    remove_column :users, :zip, :string
  end
end
