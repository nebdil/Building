class ChangeAddress < ActiveRecord::Migration[5.1]
  def change
    remove_column :buildings, :street_no, :string
    remove_column :buildings, :street_name, :string
    remove_column :buildings, :city, :string
    remove_column :buildings, :province, :string
    remove_column :buildings, :country, :string
    remove_column :buildings, :postal_code, :string
    add_column :buildings, :address, :string
  end
end
