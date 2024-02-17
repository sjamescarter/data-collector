class AddOrganizationRefToStudents < ActiveRecord::Migration[7.0]
  def change
    add_reference :students, :organization, foreign_key: true
  end
end
