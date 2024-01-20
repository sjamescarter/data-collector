class CreateObjectives < ActiveRecord::Migration[7.0]
  def change
    create_table :objectives do |t|
      t.text :description
      t.belongs_to :goal, null: false, foreign_key: true

      t.timestamps
    end
  end
end
