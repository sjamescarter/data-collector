class ObjectiveSerializer < ActiveModel::Serializer
  attributes :id, :description, :result
  has_many :assessments

  def result
    if object.assessments.length() > 0
      correct = object.assessments.map { |assessment| assessment.correct}.sum.to_f
      total = object.assessments.map { |assessment| assessment.total}.sum.to_f
      "#{((correct/total) * 100).round}%"
    end
  end
end
