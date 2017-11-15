class CreateReplies < ActiveRecord::Migration[5.1]
  def change
    create_table :replies do |t|
      t.string :content
      t.references :user, index: true, foreign_key: true
      t.references :post, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
