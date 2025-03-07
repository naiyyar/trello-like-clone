class CreateBoards < ActiveRecord::Migration[8.0]
  def change
    create_table :boards do |t|
      t.string :name
      t.references :user, null: false, foreign_key: true
      t.string :background

      t.timestamps
    end
  end
end
