class CreateGoals < ActiveRecord::Migration[7.0]
  def change
    create_table :goals do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :student, null: false, foreign_key: true
      t.string :condition
      t.string :behavior
      t.integer :accuracy
      t.string :measurement
      t.integer :trials_correct
      t.integer :trials_total

      t.timestamps
    end
  end
end
