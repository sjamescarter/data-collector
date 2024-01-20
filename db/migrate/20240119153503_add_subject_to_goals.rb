class AddSubjectToGoals < ActiveRecord::Migration[7.0]
  def change
    add_column :goals, :subject, :string
  end
end
