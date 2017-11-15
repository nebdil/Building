class CreateBuildings < ActiveRecord::Migration[5.1]
  def change
    create_table :buildings do |t|
      t.string :street_no
      t.string :street_name
      t.string :city
      t.string :province
      t.string :country
      t.string :postal_code

     t.timestamps null: false
    end
  end
end
