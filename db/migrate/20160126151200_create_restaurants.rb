class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.string :name, null: false, index: true
      t.string :address, null: false, index: true
      t.float :lat, null: false, index: true
      t.float :lng, null: false, index: true
      t.integer :price_range, null: false
      t.string :url
      t.string :photo_url
      t.timestamps null: false
    end
  end
end
