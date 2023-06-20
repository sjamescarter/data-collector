class StudentSerializer < ActiveModel::Serializer
  attributes :id, :initial, :name, :grade_level

  def name
    "#{self.object.first_name} #{self.object.last_name}"
  end

  def initial
    self.object.first_name[0]
  end
end
