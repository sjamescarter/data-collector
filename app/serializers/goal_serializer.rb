class GoalSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :owner, :summary, :subject, :condition, :behavior, :accuracy, :measurement
  has_many :objectives

  def owner
    "#{object.user.first_name} #{object.user.last_name}, #{object.user.job_title}"
  end

  def summary
    "Given #{object.condition}, #{object.student.first_name} will #{object.behavior} with #{object.accuracy}% accuracy as measured by #{object.measurement} by the next annual review."
  end
end
