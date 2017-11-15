class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password
      t.references :building, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
