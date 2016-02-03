class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.integer :user_id, null: false
      t.integer :restaurant_id, null: false
      t.string :caption

      t.timestamps null: false
    end
  end
end
