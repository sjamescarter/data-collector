class GoalSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :owner, :condition, :behavior, :accuracy, :measurement
  has_many :objectives

  def owner
    owner = User.find(object.user_id)
    "#{owner.first_name} #{owner.last_name}, #{owner.job_title}"
  end

end
