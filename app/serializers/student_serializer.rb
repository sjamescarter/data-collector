class StudentSerializer < ActiveModel::Serializer
  attributes :id, :initial, :name, :grade_level
  has_many :goals 
  # do
  #   object.goals.where(user_id: $current_user) 
  # end
  
  def initial
    object.first_name[0]
  end

  def name
    "#{object.first_name} #{object.last_name}"
  end

  # def current_user
  #   @@user = @instance_options[:current_user].id
  # end
end
