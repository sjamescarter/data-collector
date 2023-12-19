class CreateData < ActiveRecord::Migration[7.0]
  def change
    create_table :data do |t|
      t.string :note
      t.string :correct
      t.string :total
      t.belongs_to :goals, null: false, foreign_key: true

      t.timestamps
    end
  end
end
