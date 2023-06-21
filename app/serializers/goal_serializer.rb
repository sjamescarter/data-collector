class GoalSerializer < ActiveModel::Serializer
  attributes :id, :condition, :behavior, :accuracy, :measurement, :result
  has_one :user
  has_one :student

  def result
    if self.object.trials_total
      correct = self.object.trials_correct.to_f
      total = self.object.trials_total.to_f
      "#{(correct/total * 100).round}%"
    end
  end
end
