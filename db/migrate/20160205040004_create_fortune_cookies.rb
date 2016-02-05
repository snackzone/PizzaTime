class CreateFortuneCookies < ActiveRecord::Migration
  def change
    create_table :fortune_cookies do |t|
      t.string :quote, null: false
      t.string :author, null: false
      t.timestamps null: false
    end
  end
end
