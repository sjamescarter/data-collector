class GoalSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :owner, :condition, :behavior, :accuracy, :measurement, :result
  has_many :assignments

  def owner
    owner = User.find(object.user_id)
    "#{owner.first_name} #{owner.last_name}, #{owner.job_title}"
  end

  def result
    if object.assignments.length() > 0
      correct = object.assignments.map { |assignment| assignment.correct}.sum.to_f
      total = object.assignments.map { |assignment| assignment.total}.sum.to_f
      "#{((correct/total) * 100).round}%"
    end
  end
end
