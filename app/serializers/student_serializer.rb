class StudentSerializer < ActiveModel::Serializer
  attributes :id, :initial, :name, :first_name, :grade_level
  has_many :goals 
  
  def initial
    object.last_name[0]
  end

  def name
    "#{object.last_name}, #{object.first_name}"
  end

end
