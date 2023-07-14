class GoalSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :owner, :condition, :behavior, :accuracy, :measurement, :result

  def owner
    owner = User.find(object.user_id)
    "#{owner.first_name} #{owner.last_name}, #{owner.job_title}"
  end

  def result
    if object.trials_total
      correct = object.trials_correct.to_f
      total = object.trials_total.to_f
      "#{(correct/total * 100).round}%"
    end
  end
end
