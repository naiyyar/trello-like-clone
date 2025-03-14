class CreateBoardInvitations < ActiveRecord::Migration[8.0]
  def change
    create_table :board_invitations do |t|
      t.string :email
      t.string :token
      t.references :board, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :status

      t.timestamps
    end
  end
end
