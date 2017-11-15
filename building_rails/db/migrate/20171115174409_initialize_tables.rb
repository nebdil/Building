class InitializeTables < ActiveRecord::Migration[5.1]
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
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password
      t.references :building, index: true, foreign_key: true
      t.timestamps null: false
    end
    create_table :posts do |t|
      t.string :content
      t.references :user, index: true, foreign_key: true
      t.timestamps null: false
    end
    create_table :tags do |t|
      t.string :name
      t.timestamps null: false
    end
    create_table :poststags do |t|
      t.references :post, index: true, foreign_key: true
      t.references :tag, index: true, foreign_key: true
    end
    create_table :likes do |t|
      t.references :user, index: true, foreign_key: true
      t.references :post, index: true, foreign_key: true
      t.timestamps null: false
    end
    create_table :replies do |t|
      t.string :content
      t.references :user, index: true, foreign_key: true
      t.references :post, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
