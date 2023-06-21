class GoalSerializer < ActiveModel::Serializer
  attributes :id, :condition, :behavior, :accuracy, :measurement, :trials_correct, :trials_total
  has_one :user
  has_one :student
end
