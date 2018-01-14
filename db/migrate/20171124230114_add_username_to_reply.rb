class AddUsernameToReply < ActiveRecord::Migration[5.1]
  def change
    add_column :replies, :username, :string
  end
end
