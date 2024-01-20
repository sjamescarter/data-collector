class CreateAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :assessments do |t|
      t.text :note
      t.integer :correct
      t.integer :total
      t.belongs_to :objective, null: false, foreign_key: true

      t.timestamps
    end
  end
end
