class AssessmentSerializer < ActiveModel::Serializer
  attributes :id, :note, :correct, :total
  has_one :objective
end
