class CreateAssignments < ActiveRecord::Migration[7.0]
  def change
    create_table :assignments do |t|
      t.text :note
      t.integer :correct
      t.integer :total
      t.belongs_to :goal, null: false, foreign_key: true

      t.timestamps
    end
  end
end
