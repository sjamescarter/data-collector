class AssignmentSerializer < ActiveModel::Serializer
  attributes :id, :note, :correct, :total
  belongs_to :goal
end
