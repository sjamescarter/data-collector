class StudentSerializer < ActiveModel::Serializer
  attributes :id, :initial, :name, :grade_level
  has_many :goals 
  
  def initial
    object.first_name[0]
  end

  def name
    "#{object.first_name} #{object.last_name}"
  end

end
